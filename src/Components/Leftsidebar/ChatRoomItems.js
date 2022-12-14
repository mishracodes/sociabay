import React, { useContext, useEffect, useState } from 'react'
import './ChatRoomItems.css'
import { Avatar } from '@mui/material'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MD5 from 'crypto-js/md5';
import {Link} from 'react-router-dom'
import mainContext from '../../Context/mainContext';
import db from "../../firebase";
import parse from "html-react-parser";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
const ChatRoomItems = ({id,name,profileURL,Myemail,type}) => {
  const [lastmsg, setlastmsg] = useState("")
  const [lastMsgTime, setlastMsgTime] = useState("")
  const context = useContext(mainContext)
  const {setcurrentHashId,markAsRead,setMemberDetails}=context;
  let hash =""

  const handleClick=(id,Myemail)=>{
    setMemberDetails([])
    if(type==="chat"){
    if(Myemail.localeCompare(id)<0){
      hash = MD5(Myemail+id).toString()
      markAsRead(hash, name)
      setcurrentHashId(MD5(Myemail+id).toString());      
      }
    else{
      hash = MD5(id+Myemail).toString()
      markAsRead(hash, name)
      setcurrentHashId(MD5(id+Myemail).toString());
     }
    }
    
  else{
    hash = MD5(id).toString()
    markAsRead(hash, name)
    setcurrentHashId(MD5(id).toString());      
}

  }  
  

 useEffect(() => {
  handleClick(id, Myemail)
  const chatRef = collection(db, "Chats", hash, "message")
        const observer = onSnapshot(query(chatRef, orderBy("mTimestamp", "asc")), docSnapshot => {
      
            const docLength=docSnapshot.docs.length
            if(docLength>0){
              const docData = docSnapshot.docs[docLength-1].data()
            setlastmsg(
                docData.mText
            )
            setlastMsgTime(new Date(docData.mTimestamp.toDate()).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' }))
            }
            else{
              if(type==="group"){
                setlastmsg("You created new group")
              setlastMsgTime("")
              }
              else{
              setlastmsg("")
              setlastMsgTime("")
              }
            }
        
            

        })
        return () => {
            observer()
        }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id,Myemail,type])


  return (
    <Link  to={`/home/chat/${id}`} state={{name: name, profile: profileURL,userEmail:id, type:type}} className='chatroomitems__container' onClick={()=>{handleClick(id,Myemail)}}>
      <Avatar src={profileURL}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>{name}</p>
        <div className='chatroomitem_lastMessage'>
          {lastmsg!==""&&lastMsgTime!==""&&<DoneAllIcon sx={{ fontSize: 16 }}/> }
          {((lastmsg)).length<50?parse(lastmsg):(parse(lastmsg.slice(0,25)+'...'))}</div>
      </div> 
      <div>
        <p className='chatroomitem_timestamp'>{lastMsgTime}</p>
        <KeyboardArrowDownIcon className='chatroomitem_moreActions' id="animRight"/>
      </div>     
    </Link>
  )
}

export default ChatRoomItems