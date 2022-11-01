import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import mainContext from '../../Context/mainContext';
import './AttachmentFile.css'
import { IconButton } from '@mui/material';
const AttachmentFile = () => {
    const context = useContext(mainContext)
    const {attachfilesrc, attachToggle} = context
  return (
    <div className='attachment-main-area'>
        <div className='attachment-header'>
            <IconButton onClick={attachToggle} > <CloseIcon sx={{color:"white"}} /></IconButton></div>
        <div className='attachment-main'><img width="250px" alt="" src={attachfilesrc}/></div>

    </div>
  )
}

export default AttachmentFile