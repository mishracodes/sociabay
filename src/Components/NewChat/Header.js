import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
const Header = ({toggle}) => {
  return (
    <div className="header__container" style={{height:'80px'}}>
        <IconButton onClick={toggle} sx={{color:'white'}}>
        <ArrowBackIcon/>
        </IconButton>
        <p>New Chat</p>
    </div>
  )
}

export default Header