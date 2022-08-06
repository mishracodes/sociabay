import React,{ useState } from "react";
import userContext from "./userContext.js";

const UserState = (props) => {
const [USER, setUSER] = useState(null);

  return (
    <userContext.Provider  value={{ USER, setUSER}}>{props.children}</userContext.Provider>
  )
}

export default UserState