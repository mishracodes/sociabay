import React, { useContext } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import mainContext from '../../Context/mainContext';
const Header = () => {
  const context = useContext(mainContext)
  const {newChatToggle}=context;
  return (
    <div className="header__container" style={{height:'80px'}}>
        <IconButton onClick={newChatToggle} sx={{color:'white'}}>
        <ArrowBackIcon/>
        </IconButton>
        <p>New Chat</p>
    </div>
  )
}

export default Header