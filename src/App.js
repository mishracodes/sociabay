import React, { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeftSidebar from './Components/LeftSidebar'
import MainAreaDefault from './Components/MainAreaDefault'
import RightMainArea from './Components/RightMainArea'
import Login from './Components/Login'
import userContext from './Context/userContext'

const App = () => {
  const context=useContext(userContext)
  const {USER, setUSER}= context
  useEffect(() => {
    if(localStorage.getItem('isLoggedIn'))
    setUSER({
      name:localStorage.getItem('USER.name'),
      profile:localStorage.getItem('USER.profile')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <BrowserRouter>
    <main>
      {!USER ? (<Login/>):(
        <div className="content">
      <LeftSidebar />
        <Routes>
          <Route index element={<MainAreaDefault />} />
          <Route path="/:id" element={<RightMainArea/>} />
        </Routes>
      </div>
      )}
      
    </main>
    </BrowserRouter>
  )
}

export default App