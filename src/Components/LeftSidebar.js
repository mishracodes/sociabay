import React, { useContext, useEffect } from 'react'
import './LeftSidebar.css'
import Header from './Leftsidebar/Header'
import SearchRoom from './Leftsidebar/SearchRoom'
import ChatRooms from './Leftsidebar/ChatRooms'
import mainContext from '../Context/mainContext'
const LeftSidebar = () => {
  const context = useContext(mainContext)
  const {personalDetailsT,setLastseen,newChat,newGroupActive}=context;
  useEffect(() => {
    const interval = setInterval(() => {
      setLastseen(localStorage.getItem('email'))
    }, 8000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  return (
    <div className={`leftSidebar ${newChat?'hidden':''} ${newGroupActive?'hidden':''} ${personalDetailsT?'hidden':''}`}>
      <Header/>
      <SearchRoom/>
      <ChatRooms/>
    </div>
  )
}

export default LeftSidebar