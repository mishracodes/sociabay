import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <main>
       
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
          </Routes>
      
      </main>
    </BrowserRouter>
  );
};

export default App;
