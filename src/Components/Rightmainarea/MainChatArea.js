import React, { useContext, useEffect, useRef, useState } from "react";
import "./MainChatArea.css";
import LockIcon from "@mui/icons-material/Lock";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../firebase";
import mainContext from "../../Context/mainContext";
import parse from "html-react-parser";
import Done from "@mui/icons-material/Done";
import DoneAll from "@mui/icons-material/DoneAll";
const MainChatArea = ({ id, username,name }) => {
  const [messages, setmessages] = useState();
  const context = useContext(mainContext);
  const { currentHashId, emojiToggle, markAsRead } = context;
  const bottomLine = useRef(null);
  const scrollToBottom = () => {
    bottomLine.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
  
    const roomsCollectionRef = collection(db, "Chats", currentHashId, "message");
    const unsub = onSnapshot(
      query(roomsCollectionRef, orderBy("mTimestamp", "asc")),
      (response) => {
        markAsRead(currentHashId,name)
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
            {/* new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) */}
            <div>
            {/* {e.data.media && <img alt="" width="300px" src={e.data.media} onClick={()=>{mediaToggle(e.data.media)}}/>} */}
            {e.data.mMedia && <img alt="" width="300px" src={e.data.mMedia}/>}
              {parse(e.data.mText)}
              <sub style={{ display: "flex", alignItems: "center", justifyContent:"end" }}>
                {new Date(e.data.mTimestamp.toDate()).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
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
              </sub>
            </div>
          </div>
        ))}
      <div ref={bottomLine} />
    </div>
  );
};
export default MainChatArea;
