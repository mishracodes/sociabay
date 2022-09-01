import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Home";
import MainState from "./Context/MainState";
import Loader from "./Components/Loader";
import Test from "./Components/Test";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <MainState>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home />} />
            <Route path="/loading/*" exact element={<Loader />} />
            <Route path="/test/*" exact element={<Test />} />
          </Routes>
        </MainState>
      </main>
    </BrowserRouter>
  );
};

export default App;
