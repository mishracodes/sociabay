import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import LeftSidebar from './Components/LeftSidebar';
import MainAreaDefault from './Components/MainAreaDefault';
import NewChat from './Components/NewChat';
import RightMainArea from './Components/RightMainArea';
import PersonalDetails from './Components/PersonalDetails';
import NewGroup from './Components/NewGroup';
import mainContext from './Context/mainContext';

const Home = () => {
  const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("email")) {
          navigate("/");
        } 
            // eslint-disable-next-line
      }, []);
      const context = useContext(mainContext)
      const {newGroupDetails} = context
  return (
    <div className="content">

    <LeftSidebar/>
    {!newGroupDetails && <NewGroup/>}
    {/* {newGroupDetails && <NewGroup/>} */}
    <NewChat/>
    <PersonalDetails/>
         <Routes>
         <Route path="/" exact  element={<MainAreaDefault />} />
         <Route path="/chat/:id" exact element={<RightMainArea />} />
         </Routes>

    </div>
  )
}

export default Home