import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import LeftSidebar from './Components/LeftSidebar';
import MainAreaDefault from './Components/MainAreaDefault';
import NewChat from './Components/NewChat';
import RightMainArea from './Components/RightMainArea';
import PersonalDetails from './Components/PersonalDetails';

const Home = () => {
  const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("email")) {
          navigate("/");
        } 
            // eslint-disable-next-line
      }, []);
      const [newChat, setnewChat] = useState(false)
      const toggle=()=>{
        if(newChat){
          setnewChat(false)
        }
        else{
          setnewChat(true)
        }
      }
  return (
    <div className="content">

    <LeftSidebar toggle={toggle} newChat={newChat}/>
    <NewChat  toggle={toggle} newChat={newChat}/>
    <PersonalDetails/>
         <Routes>
         <Route path="/" exact  element={<MainAreaDefault />} />
         <Route path="/chat/:id" exact element={<RightMainArea />} />
         </Routes>

    </div>
  )
}

export default Home