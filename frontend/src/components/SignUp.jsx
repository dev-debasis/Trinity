import React, {useEffect, useState} from 'react'
import * as Components from './styles.js';
const SignUp = () => {
    const [signIn, toggle] = React.useState(true);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onNameChane = (e) => {
        setName(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    
    // useEffect( async() => {
    //   const user = await fetch("/api/v1/users/current-user");
    // //   console.log(user)
    
    // }, [])

    const handleSingup = async () => {
        const res = await fetch("")
    }

    const handleLongin = async () => {
        const res = await fetch("/api/v1/users/login", {
            method: "post",
            credentials: true,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            body: JSON.stringify({
              email: email,
              password: password
            })
        });
        const response = await res.json()
        console.log(response);
    }
    
    return(
        <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-[#041330] via-[#040D21] to-[#081a36] font-["Nunito Sans"]'>

        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input onChange={onNameChane} type='text' placeholder='Name' />
                    <Components.Input onChange={onEmailChange} type='email' placeholder='Email' />
                    <Components.Input onChange={onPasswordChange} type='password' placeholder='Password' />
                    <Components.FileInput type='file' placeholder='Password' />
                    <Components.Button onChange={handleSingup}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>


            <Components.SignInContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Sign in</Components.Title>
                     <Components.Input onChange={onEmailChange} type='email' placeholder='Email' />
                     <Components.Input onChange={onPasswordChange} type='password' placeholder='Password' />
                     <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                     <Components.Button onChange={handleLongin}>Sign In</Components.Button>
                 </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        To keep connected with us please login with your personal info
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                        Sign In
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
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
    )
}

export default SignUp
