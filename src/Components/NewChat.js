import React, { useContext } from 'react'
import mainContext from '../Context/mainContext'
import './NewChat.css'
import Header from './NewChat/Header'
import NewChatRooms from './NewChat/NewChatRooms'
import NewGroupIcon from './NewChat/NewGroupIcon'
import SearchChat from './NewChat/SearchChat'

const NewChat = () => {
  const context = useContext(mainContext)
  const {newChat, newGroupToggle, newGroupActive}=context;
  return (
    <div className={`leftSidebar ${newChat?'':'hidden'} ${newGroupActive?"hidden":""}`}>
      <Header/>
      <SearchChat/>
      <NewGroupIcon onClick={newGroupToggle}/>
      <NewChatRooms/>
    </div>
  )
}

export default NewChat