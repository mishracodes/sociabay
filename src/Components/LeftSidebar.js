import React, { useContext } from 'react'
import './LeftSidebar.css'
import Header from './Leftsidebar/Header'
import SearchRoom from './Leftsidebar/SearchRoom'
import ChatRooms from './Leftsidebar/ChatRooms'
import mainContext from '../Context/mainContext'
const LeftSidebar = ({newChat,toggle}) => {
  const context = useContext(mainContext)
  const {personalDetailsT}=context;
  return (
    <div className={`leftSidebar ${newChat?'hidden':''} ${personalDetailsT?'hidden':''}`}>
      <Header toggle={toggle}/>
      <SearchRoom/>
      <ChatRooms/>
    </div>
  )
}

export default LeftSidebar