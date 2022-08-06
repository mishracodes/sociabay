import React, { useEffect } from "react";
import "./MainAreaDefault.css";
import banner from "../Assets/banner.png";
import LockIcon from "@mui/icons-material/Lock";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import LeftSidebar from "./LeftSidebar";
import { useNavigate } from "react-router-dom";
const MainAreaDefault = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/");
    } 
        // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <LeftSidebar />

      <div className="rightMainAreaDefault">
        <img className="banner__img" src={banner} alt="banner" />
        <h1 className="intro__title">sociaBay Web</h1>
        <p className="intro__text">
          Now send and receive messages without keeping your phone online.
          <br />
          Use sociaBay on up to 4 linked devices and 1 phone at the same time.
        </p>
        <p className="intro__bottom__text">
          <LaptopMacIcon sx={{ fontSize: 14 }} /> Make calls from desktop with
          sociaBay for Windows.
          <a
            href="https://www.whatsapp.com/download"
            className="itro__link"
            target="_blank"
            rel="noreferrer"
          >
            Get it here
          </a>
          .
        </p>

        <p className="intro_bottom_enc">
          <LockIcon sx={{ fontSize: 14 }} /> End-to-End Encrypted
        </p>
      </div>
    </React.Fragment>
  );
};

export default MainAreaDefault;
