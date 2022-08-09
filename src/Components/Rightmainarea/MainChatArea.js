import React, { useEffect, useRef, useState } from "react";
import "./MainChatArea.css";
import LockIcon from "@mui/icons-material/Lock";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../firebase";
const MainChatArea = ({ id, username }) => {
  const [messages, setmessages] = useState();
  const bottomLine = useRef(null)
  const scrollToBottom = () => {
    bottomLine.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    const roomsCollectionRef = collection(db, "rooms", id, "message");
    const unsub = onSnapshot(
      query(roomsCollectionRef, orderBy("timestamp", "asc")),
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
    
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages])
  
  return (
    <div className="mainChat__container">
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
            key={e.data.timestamp}
            className={
              username.split(" ")[0] === e.data.name.split(" ")[0]
                ? "mainChat_messageRight"
                : "mainChat_messageLeft"
            }
          >
            {/* new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) */}
            <p> {e.data.text} <sub>{new Date(e.data.timestamp.toDate()).toLocaleString("en-IN", {timeZone: 'Asia/Kolkata', hour12:true,hour:'numeric',minute:'numeric'})} </sub></p>
          </div>
        ))}
      <div ref={bottomLine} />
    </div>
  );
};
export default MainChatArea;
