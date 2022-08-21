import React, { useContext, useState } from "react";
import "./MainMessagebox.css";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "@mui/material";
import { collection,addDoc } from "firebase/firestore";
import db from "../../firebase";
import mainContext from "../../Context/mainContext";


const MainMessagebox = ({id,username}) => {
  const [message, setmessage] = useState("");
  const context = useContext(mainContext)
  const {currentUser}=context;

  const messageChnageHandler = (e) => {
    e.preventDefault();
    setmessage(e.target.value);
  };
  const sendMessage = (msg) => {
     addDoc(collection(db, "Chats", currentUser, "message"),{mName:username,mRead:false,mRecieved:false,mText:msg,mTimestamp:new Date(),mMedia:""});
    
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    sendMessage(message);
    setmessage("");
  };
  return (
    <div className="messageBox__container">
      <IconButton>
        <TagFacesIcon className="buttonColor" />
      </IconButton>
      <IconButton>
        <AttachmentIcon className="messageBox__attachment buttonColor" />
      </IconButton>
      <form className="messageBox__form" onSubmit={formSubmitHandler}>
        <input
          className="messageBox__input"
          type="text"
          value={message}
          onChange={messageChnageHandler}
        />
      </form>
      <IconButton>
        <MicIcon className="buttonColor" />
      </IconButton>
    </div>
  );
};

export default MainMessagebox;
