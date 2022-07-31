import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeftSidebar from './Components/LeftSidebar'
import MainAreaDefault from './Components/MainAreaDefault'
import RightMainArea from './Components/RightMainArea'

const App = () => {
  return (
    <BrowserRouter>
    <main>
      <div className="content">
      <LeftSidebar />
        <Routes>
          <Route index element={<MainAreaDefault />} />
          <Route path="/:id" element={<RightMainArea/>} />
          
        </Routes>
      </div>
    </main>
    </BrowserRouter>
  )
}

export default App