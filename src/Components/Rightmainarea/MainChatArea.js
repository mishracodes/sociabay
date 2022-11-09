import React, { useContext, useEffect, useRef, useState } from "react";
import "./MainChatArea.css";
import LockIcon from "@mui/icons-material/Lock";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import mainContext from "../../Context/mainContext";
import parse from "html-react-parser";
import Done from "@mui/icons-material/Done";
import DoneAll from "@mui/icons-material/DoneAll";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const MainChatArea = ({ id, username, name , type}) => {
  const [messages, setmessages] = useState();
  const context = useContext(mainContext);
  const { currentHashId, emojiToggle, markAsRead, mediaToggle } = context;
  const bottomLine = useRef(null);
  const scrollToBottom = () => {
    bottomLine.current.scrollIntoView({ behavior: "smooth" });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMsgId, setcurrentMsgId] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event,id) => {
    setAnchorEl(event.currentTarget);
    setcurrentMsgId(id)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteMessage =async () => {
    console.log(currentMsgId);
    // await deleteDoc(doc(db, "Chats", currentHashId, "message",currentMsgId));
    const deleteMsgRef = doc(db, "Chats", currentHashId, "message",currentMsgId);

    await updateDoc(deleteMsgRef, {
      mText: "<p><em style='color:#b0b0b7'>This message was deleted</em></p>",
      mMedia:""

    });
  };
  useEffect(() => {
    const roomsCollectionRef = collection(
      db,
      "Chats",
      currentHashId,
      "message"
    );
    const unsub = onSnapshot(
      query(roomsCollectionRef, orderBy("mTimestamp", "asc")),
      (response) => {
        markAsRead(currentHashId, name);
        setmessages(
          response.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHashId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={
        emojiToggle ? "mainChat__containeremoji" : "mainChat__container"
      }
    >
      <div className="mainChat__encrypted">
        <p>
          <LockIcon sx={{ fontSize: 11 }} /> Messages are end-to-end encrypted.
          No one outside of this chat, not even sociaBay, can read or listen to
          them. Click to learn more.
        </p>
      </div>

      <div className="messageContainer_item"></div>
      {messages &&
        messages.map((e) => (
          <div
            key={e.data.mTimestamp}
            className={
              username === e.data.mName
                ? "mainChat_messageRight"
                : "mainChat_messageLeft"
            }
          >
            <div className="message__main">
            <div>{e.data.mMedia && <img alt="" width="300px" src={e.data.mMedia} onClick={()=>{mediaToggle(e.data.mMedia)}}/>}</div>
            {type==="group"&&<div style={{margin:"2px 0 2px 0", fontSize: 12, color:"tomato", fontWeight:"bold"}}>~ {e.data.mName}</div>}
              <div className="messageDataContainer"> 
                <div className="message__text">{parse(e.data.mText)}</div>
                <div className="timestampTick">
                  {new Date(e.data.mTimestamp.toDate()).toLocaleString(
                    "en-IN",
                    {
                      timeZone: "Asia/Kolkata",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}{" "}
                  &nbsp;
                  {username === e.data.mName ? (
                    e.data.mRecieved === false ? (
                      <Done sx={{ fontSize: 15 }} />
                    ) : e.data.mRecieved === true && e.data.mRead === false ? (
                      <DoneAll sx={{ fontSize: 15 }} />
                    ) : (
                      <DoneAll sx={{ fontSize: 15, color: "#3bc8ff" }} />
                    )
                  ) : (
                    ""
                  )}
                </div>
                <KeyboardArrowDownIcon className="chatMoreOptions" onClick={(event)=>{handleClick(event,e.id)}}/>
                

              </div>
            </div>
          </div>
        ))}
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
       
      >
        <MenuItem >Message info</MenuItem>
        <MenuItem >Reply</MenuItem>
        <MenuItem >React to message</MenuItem>
        <MenuItem >Forward message</MenuItem>
        <MenuItem onClick={deleteMessage}>Delete Message</MenuItem>

      </Menu>
      <div ref={bottomLine} />
    </div>
  );
};
export default MainChatArea;
