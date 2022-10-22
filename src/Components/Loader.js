import React, { useEffect } from 'react'
import './Loader.css'
import logo3 from "../Assets/logo3.png";
import logo4 from "../Assets/logo4.png";
import walogo from "../Assets/walogo.png";
import { useNavigate } from 'react-router-dom';

const Loader = () => {
    const navigate = useNavigate();

   useEffect(() => {
     const timeout=setTimeout(()=>{
        if (!localStorage.getItem("email")) {
            navigate("/");
          } else{
        navigate("/home");
          }

     }, 1000);
   
     return () => {
        clearTimeout(timeout);
     }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
    return (
        <div className='loader__container'>
            <div className="lc__animation">
                <img className="lc__stage12" src={walogo} alt="" />
                <img className="lc__stage3" src={logo3} alt="" />
                <img className="lc__stage4" src={logo4} alt="" />
            </div>
            <div className="lc__progress__bar__container">
                <div className="lc__progress__bar"></div>
            </div>
            <div className="lc__text">sociaBay</div>
            <div className="lc__subtext">End-to-end encrypted</div>
        </div>
    )
}

export default Loader