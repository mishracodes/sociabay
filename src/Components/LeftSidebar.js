import React from 'react'
import './LeftSidebar.css'
import Header from './Leftsidebar/Header'
import SearchRoom from './Leftsidebar/SearchRoom'
import ChatRooms from './Leftsidebar/ChatRooms'
const LeftSidebar = ({newChat,toggle}) => {
  return (
    <div className={`leftSidebar ${newChat?'hidden':''}`}>
      <Header toggle={toggle}/>
      <SearchRoom/>
      <ChatRooms/>
    </div>
  )
}

export default LeftSidebar