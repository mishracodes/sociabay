import React, { useContext, useEffect, useState } from 'react'
import './ChatRoomItems.css'
import { Avatar } from '@mui/material'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MD5 from 'crypto-js/md5';
import {Link} from 'react-router-dom'
import mainContext from '../../Context/mainContext';
const ChatRoomItems = ({id,name,profileURL,Myemail}) => {
  const [concat, setconcat] = useState("");
  const context = useContext(mainContext)
  const {setcurrentHashId}=context;
  const hashCalc=()=>{
    return MD5(concat).toString()
  }  
  const handleClick=()=>{
    setcurrentHashId(hashCalc())
  }
 useEffect(() => {
  if(Myemail.charAt(0)>id.charAt(0)){
    setconcat(id+Myemail);
  }
  else{
    setconcat(Myemail+id);
  }

}, [id,Myemail])
  return (
    <Link  to={`/home/chat/${id}`} state={{name: name, profile: profileURL,userEmail:id}} className='chatroomitems__container' onClick={handleClick}>
      <Avatar src={profileURL}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>{name}</p>
        <p className='chatroomitem_lastMessage'><DoneAllIcon sx={{ fontSize: 16 }}/> hie Budz 👋</p>
      </div> 
      <div>
        <p className='chatroomitem_timestamp'>2:38 pm</p>
        <KeyboardArrowDownIcon className='chatroomitem_moreActions' id="animRight"/>
      </div>     
    </Link>
  )
}

export default ChatRoomItems