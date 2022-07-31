import React from 'react'
import './ChatRoomItems.css'
import { Avatar } from '@mui/material'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DoneAllIcon from '@mui/icons-material/DoneAll';
const ChatRoomItems = () => {
 
  return (
    <div className='chatroomitems__container'>
      <Avatar src={`https://pps.whatsapp.net/v/t61.24694-24/207961644_954227662121144_2352866904679911611_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVz94lF63wvk0c7RlQ08dbaydeok9fvap_v8XFQTuUNuNw&oe=62F542B5`}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>Sona Budz</p>
        <p className='chatroomitem_lastMessage'><DoneAllIcon className='recieved__status'/> hie Budz 👋</p>
      </div> 
      <div>
        <p className='chatroomitem_timestamp'>2:38 pm</p>
        <KeyboardArrowDownIcon className='chatroomitem_moreActions' id="animRight"/>
      </div>     
    </div>
  )
}

export default ChatRoomItems