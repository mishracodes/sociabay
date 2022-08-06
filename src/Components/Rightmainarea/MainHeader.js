import { Avatar, IconButton } from '@mui/material';
import React from 'react'
import './MainHeader.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const MainHeader = ({name,profileURL}) => {
  return (
    <div className='main__header__container'>
      <div className='main__header__name'>
        <Avatar  src={profileURL} alt='header avatar'/>
        <div> 
          <p className='main__header__name__text'>{name}</p>
          <p className='main__header__name__status'>Online</p>
        </div>

      </div>
      <div className='headerIconButton'>
        <IconButton>
          <SearchIcon className='buttonColor'/>
        </IconButton>
        <IconButton>
          <MoreVertIcon className='buttonColor'/>
        </IconButton>
      </div>
      
      
    </div>
  )
}

export default MainHeader;