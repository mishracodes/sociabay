import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const SearchChat = () => {
  return (
    <div className='searchrooms__container'>
      <form className='searchrooms__form'>
        <SearchIcon/>
        <input className='searchrooms__input' type='text' placeholder='Search or start a new chat'/>
        
      </form>
      </div>
  )
}

export default SearchChat