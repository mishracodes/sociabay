import React,{ useState } from "react";
import mainContext from "./mainContext.js";

const MainState = (props) => {
const [USER, setUSER] = useState(null);
const [currentUser, setcurrentUser] = useState(null)
const [emojiToggle, setemojiToggle] = useState(false)
const [message, setmessage] = useState("");
const [personalDetailsT, setpersonalDetailsT] = useState(false)
const togglepersonalDetailsT=()=>{
  if(personalDetailsT){
    setpersonalDetailsT(false)
  }
  else{
    setpersonalDetailsT(true)
  }
}

const toggleEmoji=()=>{
  if(emojiToggle){
    setemojiToggle(false)
  }
  else{
    setemojiToggle(true)
  }
}

  return (
    <mainContext.Provider  value={{ USER, setUSER,currentUser,setcurrentUser,emojiToggle,toggleEmoji,message,setmessage,personalDetailsT,togglepersonalDetailsT}}>{props.children}</mainContext.Provider>
  )
}

export default MainState