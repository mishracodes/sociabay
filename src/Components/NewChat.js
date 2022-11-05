import React, { useContext } from 'react'
import mainContext from '../Context/mainContext'
import './NewChat.css'
import Header from './NewChat/Header'
import NewChatRooms from './NewChat/NewChatRooms'
import NewGroupIcon from './NewChat/NewGroupIcon'
import SearchChat from './NewChat/SearchChat'

const NewChat = () => {
  const context = useContext(mainContext)
  const {newChat}=context;
  return (
    <div className={`leftSidebar ${newChat?'':'hidden'}`}>
      <Header/>
      <SearchChat/>
      <NewGroupIcon/>
      <NewChatRooms/>
    </div>
  )
}

export default NewChat