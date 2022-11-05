import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Home";
import Loader from "./Components/Loader";
import Test from "./Components/Test";
import mainContext from "./Context/mainContext";
import MediaModal from "./Components/MediaModel/MediaModel";

const App = () => {
  const context = useContext(mainContext)
  const {  mediaModal } = context
  return (
    <BrowserRouter>
      <main>
        
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
            <Route path="/loading/*" exact element={<Loader />} />
            <Route path="/test/*" exact element={<Test />} />
          </Routes>
      </main>
      {mediaModal && <MediaModal/>}
    </BrowserRouter>
  );
};

export default App;
