import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
const Signupnav = () => {
  const [user, setuser] = useState({email:'',name:'',phone:'',about:'',password:'',confirmpassword:''})
  const inputHandler=(event)=>{
    setuser({...user,[event.target.name]:event.target.value})
  }
  useEffect(() => {
    localStorage.getItem("SignupEmail");
    localStorage.getItem("SignupName");
  
  }, [])
  const submitHandler=(event)=>{
    event.preventDefault()
    if(user.password!==user.confirmpassword){
      alert('passwords do not match')
      return;
    }
    
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        alert('a user with this email already exist')
      } else {
        
      }
    })
  }
  
  return (
    <div id='signup' className='signup__container_main'>
        <form className="login__container_main__form" onSubmit={submitHandler}>
          <h2 className="login__container_main__form_title">Your Details</h2>
          <div className='login_profile_container'>
            <Avatar src="" sx={{width:"70px", height:"70px", marginBottom:"15px"}}/>
            <IconButton sx={{position:'absolute', right:'-12px', bottom:'7px',color:'white',backgroundColor:'#cccccc5d'}}>
            <EditIcon style={{ width:'14px', height:'14px'}}/>
            </IconButton>

          </div>

          <input name='name' value={user.name} onChange={inputHandler} className="form__input" type="text" placeholder="Full Name" required/>
          <input name='phone' value={user.phone} onChange={inputHandler} className="form__input" type="text" placeholder="Phone Number" required/>
          <input name='email' value={user.email} onChange={inputHandler} className="form__input" type="email" placeholder="Email" required/>
          <input name='about' value={user.about} onChange={inputHandler} className="form__input" type="text" placeholder="About" />
          <input name='password' value={user.password} onChange={inputHandler} className="form__input" type="password" placeholder="Password" required/>
          <input name='confirmpassword' value={user.confirmpassword} onChange={inputHandler} className="form__input" type="password" placeholder="Confirm Password" required/>
        
          <button type='submit' className="login__container__button">SIGN UP</button>
        </form>
      </div>
  )
}

export default Signupnav