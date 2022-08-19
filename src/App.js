import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Home";
import Signup from "./Components/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <main>
       
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
            <Route path="/signup/*" exact element={<Signup />} />
          </Routes>
      
      </main>
    </BrowserRouter>
  );
};

export default App;
