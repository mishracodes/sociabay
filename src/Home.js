import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import LeftSidebar from './Components/LeftSidebar';
import MainAreaDefault from './Components/MainAreaDefault';
import RightMainArea from './Components/RightMainArea';

const Home = () => {
  const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("email")) {
          navigate("/");
        } 
            // eslint-disable-next-line
      }, []);
  return (
    <div className="content">

    <LeftSidebar />
         <Routes>
         <Route path="/" exact  element={<MainAreaDefault />} />
         <Route path="/chat/:id" exact element={<RightMainArea />} />
         </Routes>

    </div>
  )
}

export default Home