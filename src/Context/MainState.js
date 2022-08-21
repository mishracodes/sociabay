import React,{ useState } from "react";
import mainContext from "./mainContext.js";

const MainState = (props) => {
const [USER, setUSER] = useState(null);
const [currentUser, setcurrentUser] = useState(null)
  return (
    <mainContext.Provider  value={{ USER, setUSER,currentUser,setcurrentUser}}>{props.children}</mainContext.Provider>
  )
}

export default MainState