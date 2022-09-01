import React, { useEffect, useState } from "react";
import "./RightMainArea.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import db from "../firebase";
import MainHeader from "./Rightmainarea/MainHeader";
import MainChatArea from "./Rightmainarea/MainChatArea";
import MainMessagebox from "./Rightmainarea/MainMessagebox";
import PersonDetail from "./Rightmainarea/PersonDetail";
import Emoji from "./Emoji/Emoji";

const RightMainArea = () => {
  const navigate = useNavigate();
  const [togglePersonDetail, settogglePersonDetail] = useState(false)
  const { id } = useParams();
  const location = useLocation().state;
  const [name, setname] = useState();
  const [profileURL, setprofileURL] = useState();
  const [userEmail, setuserEmail] = useState();

  // const getDetails = async (id) => {
  //   if (id) {
  //     const docRef = doc(db, "rooms", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       //  setname(docSnap.data().name);
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }
  // };
  useEffect(() => {
    if (!location) {
      navigate("/home");
    } else if (!localStorage.getItem("email")) {
      navigate("/");
    } else {
      setname(location.name);
      setprofileURL(location.profile);
      setuserEmail(location.userEmail);
    //  getDetails(id);
    }
return () => {
  settogglePersonDetail(false)
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location]);
  const settoggleDetails=()=>{
    if(togglePersonDetail)
    settogglePersonDetail(false)
    else
    settogglePersonDetail(true)
  }
  return (
   <React.Fragment>
      <div className={`rightMainArea ${togglePersonDetail?'rightMainAreaHalf':''}`}>
        <MainHeader name={name} profileURL={profileURL} settoggleDetails={settoggleDetails} uEmail={userEmail}/>
        <MainChatArea id={id} username={localStorage.getItem("USERname")} />
        <Emoji/>
        <MainMessagebox id={id} username={localStorage.getItem("USERname")} />
      </div>
      <div className={`personDetailContainer ${togglePersonDetail?'':'hidden'}`}>
      <PersonDetail email={id}/>
      </div>
      </React.Fragment>
  );
};

export default RightMainArea;
