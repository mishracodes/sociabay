import React, { useEffect, useState } from "react";
import "./MainChatArea.css";
import LockIcon from "@mui/icons-material/Lock";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../firebaseaa";
const MainChatArea = ({ id, username }) => {
  const [messages, setmessages] = useState();

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
      }
    );
    return () => {
      unsub();
    };
  }, [id]);
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
              username.split(" ")[0] === e.data.name
                ? "mainChat_messageRight"
                : "mainChat_messageLeft"
            }
          >
            <p> {e.data.text}</p>
          </div>
        ))}
      {/* <div className='mainChat_messageLeft'><p> Hie Budz I love you 😘</p></div>
      <div className='mainChat_messageRight'><p> I love you too budz 😘😘</p></div> */}
    </div>
  );
};
export default MainChatArea;
