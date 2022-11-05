import React,{ useState } from "react";
import mainContext from "./mainContext.js";
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { MD5 } from "crypto-js";
const MainState = (props) => {
const [USER, setUSER] = useState(null);
const [emojiToggle, setemojiToggle] = useState(false)
const [message, setmessage] = useState("");
const [personalDetailsT, setpersonalDetailsT] = useState(false)
const [personDetails, setpersonDetails] = useState({name:"",email:"",lastseen:"",about:"",phone:"",profile:""})
const [lastseenStatus, setlastseenStatus] = useState('Click here to get more details')
const [uidarr, setuidarr] = useState([]);
const [currentHashId,setcurrentHashId] = useState(null)
const [newChat, setnewChat] = useState(false)
const [togglePersonDetail, settogglePersonDetail] = useState(false)
const [attachfilesrc, setattachfilesrc] = useState("")
const [attachfileUpload, setattachfileUpload] = useState(null)
const [isFileAttached, setIsFileAttached] = useState(false)
const [sendIconChange, setSendIconChange] = useState(false)
const [mediaModal, setMediaModal] = useState(false)
const [mediaModalUrl, setMediaModalUrl] = useState("")
const [newGroupActive, setNewGroupActive] = useState(false)
const settoggleDetails=()=>{
  if(togglePersonDetail)
  settogglePersonDetail(false)
  else
  settogglePersonDetail(true)
}

const newChatToggle=()=>{
  if(newChat){
    setnewChat(false)
  }
  else{
    setnewChat(true)
  }
}


const getHash=(email,myMail)=>{
  if(myMail.localeCompare(email)<0){
    setcurrentHashId(MD5(myMail+email).toString());
  }
  else{
    setcurrentHashId(MD5(email+myMail).toString());
  }
}

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
        const docRef = doc(db, "users", email);
         const docSnap = await  getDoc(docRef);
        if (docSnap.exists()) {
          //  setname(docSnap.data().name);
          setpersonDetails({name:docSnap.data().name,email:docSnap.data().email,lastseen:docSnap.data().lastseen,about:docSnap.data().about,phone:docSnap.data().phone,profile:docSnap.data().profile})

        } else {
          console.log("No such document!");
        }
      
}

const setLastseen=(email)=>{
  updateDoc(doc(db, "users",email),{lastseen:new Date()})
}
const getTimeDiff=(date)=>{
  const t1 = date;
  const t2 = new Date();
  const dif = ( t2.getTime() - t1.getTime() ) / 1000;
  if(dif<=10){
    return "Online"
  }
  return t1.toLocaleString("en-IN", {timeZone: 'Asia/Kolkata', hour12:true,hour:'numeric',minute:'numeric',year: 'numeric',month: 'short',day: 'numeric'});
}
const getLastseen=(email)=>{
  getDoc(doc(db, 'users', email)).then(docSnap => {
    setlastseenStatus(getTimeDiff(new Date(docSnap.data().lastseen.toDate())))
  })
  
  

  // console.log(new Date(lastseenStatus.toDate()).toLocaleString("en-IN", {timeZone: 'Asia/Kolkata', hour12:true,hour:'numeric',minute:'numeric'}));
}
const updatereadrecipt= async(item)=> {
  const chatRef = collection(db, "Chats", item.uid, "message")
  const observer = await getDocs(chatRef)
  observer.forEach((docData) => {
    // doc.data() is never undefined for query doc snapshots
    updateDoc(doc(db, "Chats", item.uid, "message",docData.id),{mRecieved:true})
  })

}


const getuidarr = (myemail)=>{
  if(myemail){
  const chatRef = collection(db, "users", myemail, "contacts")
  // eslint-disable-next-line no-unused-vars
  const observer = onSnapshot(chatRef, docSnapshot => {
    setuidarr(docSnapshot.docs.map((e)=>({uid:e.data().uid})))
    
  
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
  })
}
}

const markAsRead= async (hashId, name)=>{
     
  const chatRef = collection(db, "Chats", hashId, "message")
  const observer = await getDocs(chatRef)
  observer.forEach((docData) => {
    // doc.data() is never undefined for query doc snapshots
    if(name===docData.data().mName&&docData.data().mName!==localStorage.getItem("USERname"))
    updateDoc(doc(db, "Chats", hashId, "message",docData.id),{mRead:true})
  })

}
const attachToggle = () => {
  if (isFileAttached) {
    setIsFileAttached(false)
    setattachfilesrc("")
  }
  else {
    setIsFileAttached(true)
  }
}
const mediaToggle = (media) => {
  if (mediaModal) {
    setMediaModal(false)

  }
  else {
    setMediaModalUrl(media)
    setMediaModal(true)
  }

}

const attachment = (event) => {
  setattachfilesrc(URL.createObjectURL(event.target.files[0]))
  setattachfileUpload(event.target.files[0])

  attachToggle()
  setSendIconChange(true)
  event.target.value = ''
}

const addParticipantsToGroup =()=>{
  console.log("clicked")
}

const newGroupToggle=()=>{

  if(newGroupActive){
    setNewGroupActive(false)
    setnewChat(true)  
  }
  else{
    setNewGroupActive(true)
    setnewChat(false)
  }

}

  return (
    <mainContext.Provider  value={{ USER, setUSER,emojiToggle,toggleEmoji,message,setmessage,personalDetailsT,togglepersonalDetailsT,getPersonDetails,personDetails,setLastseen,getLastseen,lastseenStatus,setlastseenStatus,getuidarr,uidarr,updatereadrecipt,getHash,currentHashId,setcurrentHashId,newChatToggle,newChat,settogglePersonDetail,togglePersonDetail,settoggleDetails,markAsRead,attachment,attachfileUpload,attachfilesrc,sendIconChange,setSendIconChange,isFileAttached,attachToggle,mediaToggle, mediaModalUrl, mediaModal, newGroupActive, newGroupToggle, addParticipantsToGroup}}>{props.children}</mainContext.Provider>
  )
}

export default MainState