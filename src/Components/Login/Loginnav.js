import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
const Loginnav = (props) => {
    const navigate = useNavigate();
    const [loginUser, setloginUser] = useState({email:'',password:''})
    const inputHandler=(event)=>{
        setloginUser({...loginUser,[event.target.name]:event.target.value})
    }
  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/home");
    }

    // eslint-disable-next-line
  }, []);

    const googleSignin=()=>{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
    
           
    
            getDoc(doc(db, "users", user.email)).then(docSnap => {
              if (docSnap.exists()) {
                localStorage.setItem("email", user.email);
                localStorage.setItem("USERname", docSnap.data().name);
                localStorage.setItem("USERprofile", docSnap.data().profile);
                localStorage.setItem("about", docSnap.data().about);

                navigate("/home");
              } else {
                console.log("No such user!");
                // setDoc(doc(db, "users",user.email),{email: user.email,name:user.displayName});
                // navigate("/signup");
                localStorage.setItem("SignupEmail", user.email);
                localStorage.setItem("SignupName", '');
                props.toggle()
              }
            })
            
           
            
            
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
    }
    const signIn=(event)=>{
        event.preventDefault()
        getDoc(doc(db, "users", loginUser.email)).then(docSnap => {
            if (docSnap.exists()) {
                if(docSnap.data().password===loginUser.password){
                    localStorage.setItem("email", loginUser.email);
                    localStorage.setItem("USERname", docSnap.data().name);
                    localStorage.setItem("USERprofile", docSnap.data().profile);
                    localStorage.setItem("about", docSnap.data().about);

                    navigate("/home");
                }
                else{
                    alert("password incorrect")
                }
             
            } else {
             alert("No such email exist Please check your email or Signup!");
              // setDoc(doc(db, "users",user.email),{email: user.email,name:user.displayName});
              // navigate("/signup");
              setloginUser({email:'',password:''})
              localStorage.setItem("SignupEmail", loginUser.email);
              localStorage.setItem("SignupName", loginUser.password);
              props.toggle()
            }
          })
    }

  return (
    <div id='login' className='login__container_main'>
        <form className="login__container_main__form">
          <h2 className="login__container_main__form_title">Enter your Crdentials</h2>
         
          <input value={loginUser.email} onChange={inputHandler} name='email' className="form__input" type="email" placeholder="Email" />
          <input value={loginUser.password} onChange={inputHandler} name='password' className="form__input" type="password" placeholder="Password" />
   
        
          <button onClick={signIn} className="login__container__button">SIGN IN</button>
        </form>

        <button onClick={googleSignin} className="login-with-google-btn">
          Sign in with Google
        </button>
      </div>
  )
}

export default Loginnav