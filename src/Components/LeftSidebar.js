import React from 'react'
import './LeftSidebar.css'
import Header from './Leftsidebar/Header'
import SearchRoom from './Leftsidebar/SearchRoom'
import ChatRooms from './Leftsidebar/ChatRooms'
const LeftSidebar = () => {
  return (
    <div className='leftSidebar'>
      <Header/>
      <SearchRoom/>
      <ChatRooms/>
    </div>
  )
}

export default LeftSidebar