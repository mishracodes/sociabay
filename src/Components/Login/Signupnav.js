import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { doc, getDoc, setDoc } from "firebase/firestore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import db, {storage} from "../../firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
const Signupnav = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({email:'',name:'',phone:'',about:'',password:'',confirmpassword:''})
  const [AvatarSrc, setAvatarSrc] = useState("")
  const [imageUpload, setImageUpload] = useState(null);
  const inputHandler=(event)=>{
    setuser({...user,[event.target.name]:event.target.value})
  }
  useEffect(() => {
    localStorage.getItem("SignupEmail");
    localStorage.getItem("SignupName");
  
  }, [])
  const submitHandler=(event)=>{
    event.preventDefault()
    if (imageUpload == null) return;

    if(user.password!==user.confirmpassword){
      alert('passwords do not match')
      return;
    }
    
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        alert('a user with this email already exist')
      } else {
       
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setDoc(doc(db, "users",user.email),{email:user.email,about:user.about, name:user.name, phone:user.phone,password:user.password,profile:url, lastseen: new Date()});
            localStorage.setItem("email", user.email);
            localStorage.setItem("USERname", user.name);
            localStorage.setItem("USERprofile", url);
           
          });
        });
        navigate("/home");
      }
    })
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const imagePicker=(event)=>{
      setAvatarSrc(URL.createObjectURL(event.target.files[0]));
      setImageUpload(event.target.files[0]);
      handleClose()
      
  }
  
  return (
    <div id='signup' className='signup__container_main'>
        <form className="login__container_main__form" onSubmit={submitHandler}>
          <h2 className="login__container_main__form_title">Your Details</h2>
          <div className='login_profile_container'>
            <Avatar id='profileAvatar' src={AvatarSrc} sx={{width:"70px", height:"70px", marginBottom:"15px"}}/>
            <IconButton sx={{position:'absolute', right:'-12px', bottom:'7px',color:'white',backgroundColor:'#cccccc5d'}}
            onClick={handleClick}
            >
            <EditIcon style={{ width:'14px', height:'14px'}}/>
            </IconButton>
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        
      >
        <MenuItem><input style={{display:'none'}}  onChange={imagePicker} type='file' id='profileImageUpload'/> <label htmlFor='profileImageUpload'>Choose Image</label> </MenuItem>
      </Menu>
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