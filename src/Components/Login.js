import React from 'react'
import './Login.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const signIn=()=>{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  return (
    <div className='login'>
        <div className='login-container'>
            <img src='android-chrome-256x256.png' alt='login-logo'/>
            <h1> Login to SociaBay using Google</h1>
            <button onClick={signIn} class="login-with-google-btn" >Sign in with Google</button>
        </div>
    </div>
  )
}

export default Login