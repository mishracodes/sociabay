import React, { useContext } from "react";
import mainContext from "../Context/mainContext";
import "./PersonalDetails.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
          src="https://pps.whatsapp.net/v/t61.24694-24/231456639_1349162672220228_2729460684605501055_n.jpg?ccb=11-4&oh=01_AVyYj4xOjf-X5xN6BLIuyxYq9gLfVAal8I9kT9M49mJQXg&oe=63169E2A"
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
