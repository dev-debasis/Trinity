import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Ensure the file path is provided
        if (!localFilePath) {
            throw new Error('File path not provided');
        }

        // Upload the file to Cloudinary with resource_type set to 'raw'
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw"
        });

        console.log("File uploaded successfully:", uploadResult.url);

        // Safely remove the file after upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return uploadResult;

    } catch (error) {
        console.error("Error during file upload:", error.message);

        // Ensure the file is deleted even if an error occurs
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };
