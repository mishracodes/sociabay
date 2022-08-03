import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeftSidebar from './Components/LeftSidebar'
import MainAreaDefault from './Components/MainAreaDefault'
import RightMainArea from './Components/RightMainArea'
import Login from './Components/Login'

const App = () => {
  const [user, setuser] = useState(null)

  useEffect(() => {

  },[])

  return (
    <BrowserRouter>
    <main>
      {user ? (<Login/>):(
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