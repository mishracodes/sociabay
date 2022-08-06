import React, { useState } from 'react'
import './Header.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate=useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    localStorage.clear('isLoggedIn')

    localStorage.clear('USER.name');
    localStorage.clear('USER.profile');
    navigate("/")
  };
  
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

        <IconButton  onClick={handleClick} >
          <MoreVertIcon className='buttonColor'/>
        </IconButton>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
        <MenuItem onClick={logoutHandler}>
          Logout
        </MenuItem>
      </Menu>
      
      
    </div>
  )
}

export default Header