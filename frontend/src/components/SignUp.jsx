import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from './styles.js';

const SignUp = () => {
    const [signIn, toggle] = React.useState(true);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [userName,setUserName] = useState("");

    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onAvatarChange = (e) => {
        setAvatar(e.target.files[0]); // Use e.target.files[0] for the file input
    };

    // navigation function to navigate user to different page
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:5000/api/v1/users/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        if (res.ok) {
            const response = await res.json();
            console.log(response);
            routeChange();
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fullName", Name);
        formData.append("username", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar); // 'avatar' should be the file object

        try {
            const res = await fetch("http://localhost:5000/api/v1/users/register", {
                method: "POST",
                body: formData,
                credentials: "include",
            });
    
            if (res.ok) {
                // Login user if the user has singned up.
                const Loginres = await fetch("http://localhost:5000/api/v1/users/login", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });
                
                // If every thing is ok navigate user to '/'
                if(Loginres.ok) {
                    const LoginResponse = await Loginres.json();
                    navigate('/', {state:{user: LoginResponse.user}});
                }
            }
        } catch (error) {
            console.log("Something went wrong while singnin user");
        }
    };

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-[#041330] via-[#040D21] to-[#081a36] font-["Nunito Sans"]'>
            <Components.Container>
                <Components.SignUpContainer signin={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input onChange={onNameChange} type='text' placeholder='Name' />
                        <Components.Input onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='Username' />
                        <Components.Input onChange={onEmailChange} type='email' placeholder='Email' />
                        <Components.Input onChange={onPasswordChange} type='password' placeholder='Password' />
                        <Components.FileInput type='file' onChange={onAvatarChange} />
                        <Components.Button onClick={handleSignup}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signin={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input onChange={onEmailChange} type='email' placeholder='Email' />
                        <Components.Input onChange={onPasswordChange} type='password' placeholder='Password' />
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button onClick={handleLogin}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signin={signIn}>
                    <Components.Overlay signin={signIn}>
                        <Components.LeftOverlayPanel signin={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signin={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
};

export default SignUp;
