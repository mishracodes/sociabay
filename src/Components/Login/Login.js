import React, { useEffect, useState } from 'react'
import './Login.css'
import Loginnav from './Loginnav'
import Signupnav from './Signupnav'
const Login = () => {
  const [active, setactive] = useState('login')
  const toggle=()=>{

    if(active==='login'){
      document.getElementById('signup').style.display='flex'
      document.getElementById('login').style.display='none'
   
    setactive('signup')
    }
    else{
      document.getElementById('signup').style.display='none'
      document.getElementById('login').style.display='flex'
      setactive('login')

    }
  }
  useEffect(() => {
    
  
  
  }, [active])
  

  return (
    <div className='login__container'>
      <div className='login__container_sidebar'>
        <h2 className="login__container_sidebar__title">Hello Friend !</h2>
          <p className="login__container_sidebar__description">
            Enter your personal details and start journey with us
          </p>
          <button className="login__container__button" onClick={toggle}>{active==='login'?'SIGN UP':'SIGN IN'}</button>
      </div>
      <Signupnav toggle={toggle}/>
      <Loginnav toggle={toggle}/>
    </div>
  )
}

export default Login