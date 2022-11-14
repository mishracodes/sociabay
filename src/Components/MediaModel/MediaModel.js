import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './MediaModel.css'
import { IconButton } from '@mui/material';
import mainContext from '../../Context/mainContext';
const MediaModal = () => {
    const context = useContext(mainContext)
    const {  mediaToggle, mediaModalUrl } = context
  return (
    
    <div className='modal-main-area' onClick={mediaToggle}>
        <div className='modal-header'><IconButton onClick={mediaToggle} ><CloseIcon sx={{ color: "rgb(117,132,142)" }}/></IconButton></div>
        <div className='modal-main'><img alt="" style={{height:'88vh'}} src={mediaModalUrl.url}/></div>
    </div>
  )
}

export default MediaModal