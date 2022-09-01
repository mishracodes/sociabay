import React, { useContext, useEffect } from 'react'
import './LeftSidebar.css'
import Header from './Leftsidebar/Header'
import SearchRoom from './Leftsidebar/SearchRoom'
import ChatRooms from './Leftsidebar/ChatRooms'
import mainContext from '../Context/mainContext'
const LeftSidebar = ({newChat,toggle}) => {
  const context = useContext(mainContext)
  const {personalDetailsT,setLastseen}=context;
  useEffect(() => {
    const interval = setInterval(() => {
      setLastseen(localStorage.getItem('email'))
    }, 8000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
   
  return (
    <div className={`leftSidebar ${newChat?'hidden':''} ${personalDetailsT?'hidden':''}`}>
      <Header toggle={toggle}/>
      <SearchRoom/>
      <ChatRooms/>
    </div>
  )
}

export default LeftSidebar