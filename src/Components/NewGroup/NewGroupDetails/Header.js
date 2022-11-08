import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import mainContext from '../../../Context/mainContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
  const context = useContext(mainContext)
  const { newGroupDetailToggle } = context
  return (
    <div className="header__container" style={{height:'80px'}}>
    <IconButton onClick={newGroupDetailToggle} sx={{color:'white'}}>
    <ArrowBackIcon/>
    </IconButton>
    <p>New group</p>
  </div>
  )
}

export default Header