import React, { useState } from "react";
import "./MainMessagebox.css";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "@mui/material";
import { collection,addDoc } from "firebase/firestore";
import db from "../../firebase";


const MainMessagebox = ({id,username}) => {
  const [message, setmessage] = useState("");
  const messageChnageHandler = (e) => {
    e.preventDefault();
    setmessage(e.target.value);
  };
  const sendMessage = (msg) => {
     addDoc(collection(db, "rooms", id, "message"),{name:username,read:false,recieved:false,text:msg,timestamp:new Date()});
    
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
