import React, { useEffect } from "react";
import "./RightMainArea.css";
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import MainHeader from "./Rightmainarea/MainHeader";
import MainChatArea from "./Rightmainarea/MainChatArea";
import MainMessagebox from "./Rightmainarea/MainMessagebox";
import LeftSidebar from "./LeftSidebar";

const RightMainArea = () => {
  const { id } = useParams();
  const { name, profileURL } = useLocation().state;

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
    getDetails(id);
  }, [id]);

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
