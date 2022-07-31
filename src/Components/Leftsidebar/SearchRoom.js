import React from 'react'
import './SearchRoom.css'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material'; 
const SearchRoom = () => {
  return (
    <div className='searchrooms__container'>
      <form className='searchrooms__form'>
        <SearchIcon/>
        <input className='searchrooms__input' type='text' placeholder='Search or start a new chat'/>
        
      </form>
      <IconButton>
      <FilterListIcon className='buttonColor'/>
      </IconButton>
    </div>
  )
}

export default SearchRoom