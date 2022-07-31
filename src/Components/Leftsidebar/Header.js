import React from 'react'
import './Header.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material'; 

const Header = () => {
  return (
    <div className='header__container'>
      <Avatar  src='https://pps.whatsapp.net/v/t61.24694-24/231456639_1349162672220228_2729460684605501055_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVyVRSr5OLFOKZzce2E6EoYoipdKz7jP7bCEc3U9oglVjA&oe=62F7DB2A' alt='header avatar'/>
      <div className='headerIconButton'>
        <IconButton>
          <DonutLargeIcon className='buttonColor'/>
        </IconButton>

        <IconButton>
          <ChatIcon className='buttonColor'/>
        </IconButton>

        <IconButton>
          <MoreVertIcon className='buttonColor'/>
        </IconButton>
      </div>
      
      
    </div>
  )
}

export default Header