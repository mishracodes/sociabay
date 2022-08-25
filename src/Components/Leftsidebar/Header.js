import React, { useContext, useState } from "react";
import "./Header.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import mainContext from "../../Context/mainContext";

const Header = ({toggle}) => {
  const context = useContext(mainContext)
  const {togglepersonalDetailsT}=context;
  const navigate = useNavigate();
  const profile=localStorage.getItem("USERprofile")
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    // localStorage.removeItem('token');
    // navigate("/login")
    localStorage.clear();
    navigate("/");
  };
 

  return (
    <div className="header__container">
      <Avatar sx={{cursor:'pointer'}} src={profile} alt="header avatar" onClick={togglepersonalDetailsT}/>
      <div className="headerIconButton">
        <IconButton>
          <DonutLargeIcon className="buttonColor" />
        </IconButton>

        <IconButton onClick={toggle}>
          <ChatIcon className="buttonColor" />
        </IconButton>

        <IconButton onClick={handleClick}>
          <MoreVertIcon className="buttonColor" />
        </IconButton>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
