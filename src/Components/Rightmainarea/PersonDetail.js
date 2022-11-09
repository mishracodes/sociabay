import React, { useContext, useEffect } from "react";
import "./PersonDetail.css";
import pic1 from "../../Assets/pdpic1.jpg";
import pic2 from "../../Assets/pdpic2.jpg";
import pic3 from "../../Assets/pdpic3.jpg";
import CommonGroupContainer from "./CommonGroupContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";
import mainContext from "../../Context/mainContext";
const PersonDetail = ({email,type}) => {
  const context = useContext(mainContext);
  const { getPersonDetails,personDetails,lastseenStatus } = context;
  useEffect(() => {
    getPersonDetails(email,type)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email,lastseenStatus])
  
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
          src={personDetails.profile}
          alt="profile pic"
        />
        <h2 className="PersonDetailName">{personDetails.name}</h2>
        <p className="PersonDetailEmail">~{personDetails.email}</p>
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
        <p>{personDetails.about}</p>
        <p>{personDetails.phone}</p>
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
