import React, { useEffect, useState } from "react";
import "./RightMainArea.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import MainHeader from "./Rightmainarea/MainHeader";
import MainChatArea from "./Rightmainarea/MainChatArea";
import MainMessagebox from "./Rightmainarea/MainMessagebox";
import LeftSidebar from "./LeftSidebar";

const RightMainArea = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation().state;
  const [name, setname] = useState()
  const [profileURL, setprofileURL] = useState()
  
  const getDetails = async (id) => {
    if (id) {
      const docRef = doc(db, "rooms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //  setname(docSnap.data().name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    if(!location){
      navigate("/home");
    }
    else if (!localStorage.getItem("email")) {
      navigate("/");
    } 
    else{
      setname(location.name)
      setprofileURL(location.profileURL)
    getDetails(id);}
       

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,location]);

  return (
    <React.Fragment>
      <LeftSidebar />
      <div className="rightMainArea">
        <MainHeader name={name} profileURL={profileURL} />
        <MainChatArea id={id} username={localStorage.getItem("USERname")} />
        <MainMessagebox id={id} />
      </div>
    </React.Fragment>
  );
};

export default RightMainArea;
