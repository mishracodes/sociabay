import React from 'react'
import { Avatar } from '@mui/material'; 
import {Link} from 'react-router-dom'
const NewChatRoomItems = ({id,name,profile}) => {
  return (
    <Link  to={`/home/chat/${id}`} state={{name: name, profile: profile}} className='chatroomitems__container'>
      <Avatar src={profile}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>{name}</p>
      </div>    
    </Link>
  )
}

export default NewChatRoomItems