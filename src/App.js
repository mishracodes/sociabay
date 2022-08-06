import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainAreaDefault from "./Components/MainAreaDefault";
import RightMainArea from "./Components/RightMainArea";
import Login from "./Components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <main>
       
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home" exact element={<MainAreaDefault />} />
            <Route path="/chat/:id" element={<RightMainArea />} />
          </Routes>
      
      </main>
    </BrowserRouter>
  );
};

export default App;
