import React, { useContext, useEffect, useState } from "react";
import "./PersonDetail.css";
import CommonGroupContainer from "./CommonGroupContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { Avatar, IconButton } from "@mui/material";
import mainContext from "../../Context/mainContext";
import CloseIcon from '@mui/icons-material/Close';
import { collection, doc, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { Link } from "react-router-dom";

const PersonDetail = ({email,type}) => {
  const context = useContext(mainContext);
  const { getPersonDetails,personDetails,lastseenStatus,settoggleDetails,memberDetails,messages  } = context;
  const [commongroupArr, setcommongroupArr] = useState([])
  useEffect(() => {
    getPersonDetails(email,type)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email,lastseenStatus])


  const getCommonGroups = async()=>{
const myEmail=localStorage.getItem("email")
    const groupRef = collection(db, "users", myEmail, "groups");
  const contactRef = collection(db, "users", email, "groups");
  const observerMy = await getDocs(groupRef)
  const observerEmail = await getDocs(contactRef);
  observerMy.forEach((docSnapshotMy) => {
   observerEmail.forEach((docSnapshotEmail)=>{
    if(docSnapshotMy.id===docSnapshotEmail.id){
      let arr = commongroupArr;
          arr.push({
            id: docSnapshotEmail.id,
            name: docSnapshotEmail.data().groupName,
            profile: docSnapshotEmail.data().profile,
          });
          setcommongroupArr(arr);
    }
   })
  
    });

  }

useEffect(() => {
  setcommongroupArr([]);
  if(commongroupArr.length===0)
  getCommonGroups();
}, [email])


  
  console.log(commongroupArr);
  
  return (
    <div className="PersonDetailContainer">
      <div className="main__header__container" style={{height:'60px'}}>
        <div className="headerIconButton">
          <IconButton onClick={settoggleDetails}>
            <CloseIcon sx={{color:"#b0b0b7"}}/>
          </IconButton>
        </div>
        <div className="main__header__name">
          <div>
            <p className="main__header__name__text">Contact Info</p>
          </div>
        </div>
      </div>
      <div className="profilePicSection">
        <img
          src={personDetails.profile}
          alt="profile pic"
        />
        <h2 className="PersonDetailName">{personDetails.name}</h2>
        <p className="PersonDetailEmail">~{personDetails.email}</p>
      </div>
      {type==="chat" &&<div className="PersonDetail__statusPhone">
        <p>About and phone number</p>
        <p>{personDetails.about}</p>
        <p>{personDetails.phone}</p>
      </div>}

      {type==="group" &&<div className="PersonDetail__statusPhone">
        <p>Group Description</p>
        <p>{personDetails.groupDesc}</p>
      </div>}

      <div className="PersonDetail__media">
        <div>
          <p>Media, links and docs </p>
          <p>57 &gt;</p>
        </div>
        <div className="PersonDetail__mediaView">
        {messages && messages.filter((e)=>{
            return(
             Object.keys(e.data.mMedia).length!==0 && e.data.mMedia.mType.split("/")[0]==="image"
            )
          }).reverse().slice(0,3).map((e)=>{return(
            <img key={e.data.mMedia.url} src={e && e.data.mMedia.url} alt="" />

          )})}

        </div> 
      </div>

      {type === "group" &&
        <div className='chatrooms__container'>
          
              <div className="GroupDetail">
              <div className='GroupDetail_participant'>{personDetails.email.slice(8)}</div>
          {memberDetails && memberDetails.map((e)=>{
            return(
              <div key={e.profile} className='chatroomitems__container'>
              <Avatar src={e.profile}/>
              <div className='chatroomitem_detail'>
                <p className='chatroomitem_name'>{e.fullName}</p>
                <p className='chatroomitem_bio'>hey there ...</p>
              </div> 
             </div>
            )
            
          })}
        </div>
        </div>
      }
     
      <div className="PersonDetail__commonGroups">
        <p className="common">1 group in common</p>
        <div>
        {commongroupArr&& commongroupArr.map((e)=>{return <Link key={e.id} to={`/home/chat/${e.id}`} state={{name: e.name, profileURL: e.profile}} className='chatroomitems__container'>
      <Avatar src={e.profile}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>{e.name}</p>
      </div>    
    </Link>
  })}
        </div>
      </div>
      <div className="PersonDetail__BlockDelete">
        <div>
          
          <BlockIcon /> Block Sona Budz 💛
        </div>
        <div>
          <DeleteIcon /> Delete Chat
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
