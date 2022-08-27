import React,{ useState } from "react";
import mainContext from "./mainContext.js";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
const MainState = (props) => {
const [USER, setUSER] = useState(null);
const [currentUser, setcurrentUser] = useState(null)
const [emojiToggle, setemojiToggle] = useState(false)
const [message, setmessage] = useState("");
const [personalDetailsT, setpersonalDetailsT] = useState(false)
const [personDetails, setpersonDetails] = useState({name:"",email:"",lastseen:"",about:"",phone:"",profile:""})
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

const getPersonDetails=async (email)=>{
  if (true) {
        const docRef = doc(db, "users", email);
        console.log(currentUser);
         const docSnap = await  getDoc(docRef);
        if (docSnap.exists()) {
          //  setname(docSnap.data().name);
          setpersonDetails({name:docSnap.data().name,email:docSnap.data().email,lastseen:docSnap.data().lastseen,about:docSnap.data().about,phone:docSnap.data().phone,profile:docSnap.data().profile})

        } else {
          console.log("No such document!");
        }
      
  }
}

  return (
    <mainContext.Provider  value={{ USER, setUSER,currentUser,setcurrentUser,emojiToggle,toggleEmoji,message,setmessage,personalDetailsT,togglepersonalDetailsT,getPersonDetails,personDetails}}>{props.children}</mainContext.Provider>
  )
}

export default MainState