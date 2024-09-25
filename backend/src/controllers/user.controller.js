import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  /*
    steps for user registration: 
    1. Taking user details from frontend as per user data model
    2. validation the data
    3. check if the user is already exist or not
    4. check for images as per data model(avatar, coverImage)
    5. upload on cloudinary
    6. Create user object and entry in the db
    7. Remove password and refresh token from response that will be sent to user
    8. Check for user creation 
    9. Return response
    */

  // Taking user details from frontend through postman
  const { username, email, fullName, password } = req.body;

  // Validating the user given fields if any field is empty or not?
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // checking if the user is already exist or not
  const isUserExit = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExit) {
    throw new ApiError(409, "Email or username already exist");
  }

  // Check for the images as per data model
  const avatarLocalPath = req.files?.avatar[0]?.path;
  
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Uploading the images from local server to the cloudinary server

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // After uploading we will delete the files from our server.

  if (!avatar) {
    throw new ApiError(400, "Uploading Avatar on cloudinary failed");
  }

  // Create User object
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user ");
  }

  // Returning the response

  return res.json(
    new ApiResponse(200, createdUser, "User Registered Successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  // Steps for user login
  // 1. req.body -> data
  // 2. username/email
  // 3. find the user
  // 4. check the password
  // 5. access and refresh token
  // 6. send cookie

  const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      user.save({ validateBeforeSave: false });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(500, "Failed to generate Access & Refresh token");
    }
  };

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  // find the user

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  // check the password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password doesn't match");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true, // Can Manage from server only
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "User LoggedIn successfully"
      )
    );
});


const logoutUser = asyncHandler(async (req, res) => {
  // Now the challenge is how can we know which user we have to logout as will not gonna ask the user to provide credentials while logOut. For that we will create a middleware that will fetch the user by the accessToken and then add the particular user object to the cookie then we will access that user from the cookie in this logOut method that's how we can get the access to the particular user.

  // const user = req.user
 await User.findByIdAndUpdate(req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )
  const options = {
    httpOnly: true, // Can Manage from server only
    secure: true
  }

  return res
  .status(200)
  .clearCookie("refreshToken", options)
  .clearCookie("accessToken", options)
  .json( new ApiResponse(200, {}, "User Logged Out Successfully") )
  
})

const refreshAccessToken = asyncHandler(async (req, res) => {
 const incomingRefreshToken = req.cookies.refreshToken || req.header.refreshToken

 if(!incomingRefreshToken){
  throw new ApiError(400, "Unauthorized access")
 }

 try {
  const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
 
  const user = await User.findById(decodedRefreshToken?._id)
 
  if(!user){
   throw new ApiError(401, "Invalid Refresh Token")
  }
 
  if(incomingRefreshToken !== user.refreshToken){
   throw new ApiError(401, "Refresh token is expired or used")
  }
 
  const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user._id)
 
 
  options = {
   httpOnly: true,
   secure: true
  }
 
  return res 
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", newRefreshToken, options)
  .json(
   200,
   {
     accessToken, refreshToken: newRefreshToken, 
   },
   "Access Token Refreshed"
  )
 } catch (error) {
  throw new ApiError(401, error?.message || "Invalid REfresh Token")
 }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // STEPS TO CHANGE PASSWORD
  // 1. fetch user from req through auth middleware
  // 2. Ask old password and new password
  // 3. check the old password and update the password with the new one
  // 4. Return res

  const {oldPassword, newPassword, confirmPassword} = req.body
  if((!newPassword === confirmPassword)){
    throw new ApiError(400, "Your new password and confirm are not same")
  }
  const user = await User.findById(req.user._id)
  const isPasswordValid = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordValid){
    throw new ApiError(400, "Invalid Old password")
  }
  user.password = newPassword
  await User.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(
    new ApiResponse(200,"Password Updated Successfully")
  )

})

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json( new ApiResponse(200, req.user, "User fetched successfully") )
  
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const {fullName, email} = req.body
  if(!fullName || !email){
    throw new ApiError(400, "Both field are required")
  }

  const user = await User.findByIdAndUpdate(req.user._id,
    {
      $set: {
        fullName, // fullName = fullName
        email
      }
    },
    {
      new: true
    }
  ).select("-password")

  return res.status(200).json( new ApiResponse(200, user, "User Details updated Successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {

  // take new avatar 
  // upload it on cloudinary save the link in any variable 
  // update the old link with current link

  const avatarLocalPath = req.file?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is missing")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  if(!avatar.url){
    throw new ApiError(400, "Error while uploading the avatar")
  }
  
 const user = await User.findByIdAndUpdate(
    req.user?._id, 
    {
      $set: [{avatar: avatar.url}]
    },
    {
      new: true
    }
  ).select("-password")

  return res
  .status(200)
  .json( new ApiResponse(200, user, "Avatar updated successfully"))
})

export { 
  registerUser, 
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar
 };