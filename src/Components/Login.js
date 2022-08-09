import React, { useEffect } from "react";
import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc,setDoc } from "firebase/firestore";
import db from "../firebase";
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/home");
    }

    // eslint-disable-next-line
  }, []);

  const signIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        localStorage.setItem("email", user.email);
        localStorage.setItem("USERname", user.displayName);
        localStorage.setItem("USERprofile", user.photoURL);
        setDoc(doc(db, "users",user.email),{about:"Hey there! I am using sociaBay", email: user.email, lastseen:new Date(),name:user.displayName, online:true,phone:+919876543210, profile:user.photoURL,groups:["Murex Env Support", "EOD Run Team", "OCTOBER 8 BANGLORE", "CBA-IBB"]});
        navigate("/home");
      })
      
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        localStorage.setItem("isLoggedIn", false);

        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="login">
      <div className="login-container">
        <img src="android-chrome-256x256.png" alt="login-logo" />
        <h1> Login to SociaBay using Google</h1>
        <button onClick={signIn} className="login-with-google-btn">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
