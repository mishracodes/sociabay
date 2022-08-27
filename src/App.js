import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Home";
import Signup from "./Components/Signup";
import MainState from "./Context/MainState";
import Loader from "./Components/Loader";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <MainState>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
            <Route path="/signup/*" exact element={<Signup />} />
            <Route path="/loading/" exact element={<Loader />} />
          </Routes>
        </MainState>
      </main>
    </BrowserRouter>
  );
};

export default App;
