import React from 'react'
import './NewChat.css'
import Header from './NewChat/Header'
import NewChatRooms from './NewChat/NewChatRooms'
import SearchChat from './NewChat/SearchChat'

const NewChat = ({newChat,toggle}) => {

  return (
    <div className={`leftSidebar ${newChat?'':'hidden'}`}>
      <Header toggle={toggle}/>
      <SearchChat/>
      <NewChatRooms/>
    </div>
  )
}

export default NewChat