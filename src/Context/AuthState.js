import React from 'react'
import authContext from "./authContext.js";

const AuthState = (props) => {
  return (
    <authContext.Provider value={{}}>{props.children}</authContext.Provider>
  )
}

export default AuthState