import React from 'react'
import './Loader.css'
import logo3 from "../Assets/logo3.png";
import logo4 from "../Assets/logo4.png";
import walogo from "../Assets/walogo.png";
const Loader = () => {
    return (
        <div className='loader__container'>
            <div class="lc__animation">
                <img class="lc__stage12" src={walogo} alt="" />
                <img class="lc__stage3" src={logo3} alt="" />
                <img class="lc__stage4" src={logo4} alt="" />
            </div>
            <div class="lc__progress__bar__container">
                <div class="lc__progress__bar"></div>
            </div>
            <div class="lc__text">sociaBay</div>
            <div class="lc__subtext">End-to-end encrypted</div>
        </div>
    )
}

export default Loader