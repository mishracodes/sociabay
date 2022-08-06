import React from 'react'
import './ChatRoomItems.css'
import { Avatar } from '@mui/material'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {Link} from 'react-router-dom'
const ChatRoomItems = ({id,name,profileURL}) => {
 
  return (
    <Link  to={`/chat/${id}`} state={{name: name, profileURL: profileURL}} className='chatroomitems__container'>
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