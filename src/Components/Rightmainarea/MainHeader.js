import { Avatar, IconButton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import "./MainHeader.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import mainContext from "../../Context/mainContext";

const MainHeader = ({ name, profileURL,settoggleDetails,uEmail,type }) => {
  const context = useContext(mainContext)
  const {getLastseen,lastseenStatus,setlastseenStatus,togglePersonDetail}=context;
  useEffect(() => {
    setlastseenStatus('Click here to get more details')
      if(uEmail){
      getLastseen(uEmail,type);
      }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uEmail])
  const headerPersonalDetails=()=>{
    console.log(togglePersonDetail);
    if(!togglePersonDetail)
    settoggleDetails()
  }
  return (
    <div className="main__header__container" onClick={headerPersonalDetails}>
      <div className="main__header__name" >
        <Avatar src={profileURL} alt="header avatar" />
        <div>
          <p className="main__header__name__text">{name}</p>
          <p className="main__header__name__status">{lastseenStatus}</p>
        </div>
      </div>
      <div className="headerIconButton">
        <IconButton>
          <SearchIcon className="buttonColor" />
        </IconButton>
        <IconButton>
          <MoreVertIcon className="buttonColor" />
        </IconButton>
      </div>
    </div>
  );
};

export default MainHeader;
