import React, { useContext } from "react";
import mainContext from "../Context/mainContext";
import "./PersonalDetails.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
const PersonalDetails = () => {
  const context = useContext(mainContext);
  const { personalDetailsT,togglepersonalDetailsT } = context;

  return (
    <div className={`leftSidebar PersonalDetails__container ${personalDetailsT ? "" : "hidden"}`}>
      <div className="header__container" style={{height:'80px'}}>
        <IconButton onClick={togglepersonalDetailsT} sx={{color:'white'}}>
        <ArrowBackIcon/>
        </IconButton>
        <p>Profile</p>
    </div>
    <div className="PersonalDetails__Subcontainer">
      <div className="PDprofilePicSection">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sociabaychat.appspot.com/o/images%2FIMG-20200720-WA0002.jpg7a2487aa-8212-4ec0-a02c-721b0ce35ed3?alt=media&token=7398ee14-b6b3-4929-a7d0-c583e85b89bdA"
          alt="profile pic"
        />
        <div className="avatar__hover">
          {/* <div><CameraAltIcon/></div>
         <p>CHANGE <br/> PROFILE PHOTO</p> */}
          
        </div>
        
        
      </div>

      <div className="PersonalDetails__details">
        <p className="PersonalDetails__label">Your Name</p>
        <p>{localStorage.getItem('USERname')}</p>
        <p className="PersonalDetails__label">This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
        <p className="PersonalDetails__label">About</p>
        <p>{localStorage.getItem('about')}</p>
      </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
