import React, { useContext, useEffect, useRef, useState } from "react";
import "./MainChatArea.css";
import LockIcon from "@mui/icons-material/Lock";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../firebase";
import mainContext from "../../Context/mainContext";
const MainChatArea = ({ id, username }) => {
  const [messages, setmessages] = useState();
  const context = useContext(mainContext)
  const {currentUser,emojiToggle}=context;
  const bottomLine = useRef(null)
  const scrollToBottom = () => {
    bottomLine.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    const roomsCollectionRef = collection(db, "Chats", currentUser, "message");
    const unsub = onSnapshot(
      query(roomsCollectionRef, orderBy("mTimestamp", "asc")),
      (response) => {
        setmessages(
          response.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        bottomLine.current.scrollIntoView({behaviour:'smooth'})
      }
    );
    return () => {
      unsub();
    };
    
  }, [currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages,currentUser])
  
  return (
    <div className={emojiToggle?'mainChat__containeremoji':'mainChat__container'}>
      <div className="mainChat__encrypted">
        <p>
          <LockIcon sx={{ fontSize: 11 }} /> Messages are end-to-end encrypted.
          No one outside of this chat, not even sociaBay, can read or listen to
          them. Click to learn more.
        </p>
      </div>
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
            {/* new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) */}
            <p> {e.data.mText} <sub>{new Date(e.data.mTimestamp.toDate()).toLocaleString("en-IN", {timeZone: 'Asia/Kolkata', hour12:true,hour:'numeric',minute:'numeric'})} </sub></p>
          </div>
        ))}
      <div ref={bottomLine} />
    </div>
  );
};
export default MainChatArea;
