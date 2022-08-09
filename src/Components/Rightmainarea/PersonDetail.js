import React from "react";
import "./PersonDetail.css";
import pic1 from "../../Assets/pdpic1.jpg";
import pic2 from "../../Assets/pdpic2.jpg";
import pic3 from "../../Assets/pdpic3.jpg";
import CommonGroupContainer from "./CommonGroupContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";
const PersonDetail = () => {
  return (
    <div className="PersonDetailContainer">
      <div className="main__header__container" style={{height:'60px'}}>
        <div className="headerIconButton">
          <IconButton></IconButton>
        </div>
        <div className="main__header__name">
          <div>
            <p className="main__header__name__text">Contact</p>
          </div>
        </div>
      </div>
      <div className="profilePicSection">
        <img
          src="https://pps.whatsapp.net/v/t61.24694-24/207961644_954227662121144_2352866904679911611_n.jpg?ccb=11-4&oh=01_AVwwOkPVZtg3Ivbtj6vt8Ke_YWAhJep7uubNlb8IynlpQw&oe=62FE0CB5"
          alt="profile pic"
        />
        <h2 className="PersonDetailName">Sona Rawka</h2>
        <p className="PersonDetailEmail">~sonarawka5@gmail.com</p>
      </div>
      <div className="PersonDetail__media">
        <div>
          <p>Media, links and docs </p>
          <p>57 &gt;</p>
        </div>
        <div className="PersonDetail__mediaView">
          <img src={pic1} alt="PersonDetail__mediaView" />
          <img src={pic2} alt="PersonDetail__mediaView" />
          <img src={pic3} alt="PersonDetail__mediaView" />
        </div>
      </div>
      <div className="PersonDetail__statusPhone">
        <p>About and phone number</p>
        <p>Hey there! I am using WhatsApp.</p>
        <p>+91 97707 39554</p>
      </div>
      <div className="PersonDetail__commonGroups">
        <p className="common">1 group in common</p>
        <div>
          <CommonGroupContainer />
        </div>
      </div>
      <div className="PersonDetail__BlockDelete">
        <div>
          
          <BlockIcon /> Block Sona Budz 💛
        </div>
        <div>
          <DeleteIcon /> Delete Chat
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
