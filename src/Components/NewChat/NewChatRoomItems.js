import React, {  useContext } from 'react'
import { Avatar } from '@mui/material'; 
import {Link} from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore';
import db from "../../firebase";
import mainContext from '../../Context/mainContext';
const NewChatRoomItems = ({id,name,profile,email,Myemail}) => {
  const context = useContext(mainContext)
  const {getHash,currentHashId,newChatToggle}=context;
  
  const addConnection =()=>{
   getHash(email,Myemail)
   newChatToggle()
   setDoc(doc(db, "users",Myemail,"contacts",email),{uid:currentHashId,name:name,profile:profile});
   setDoc(doc(db, "users",email,"contacts",Myemail),{uid:currentHashId,name:localStorage.getItem("USERname"),profile:localStorage.getItem("USERprofile")});
  }

  
  return (
    <Link  to={`/home/chat/${id}`} state={{name: name, profile: profile}} className='chatroomitems__container' onClick={addConnection}>
      <Avatar src={profile}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>{name}</p>
      </div>    
    </Link>
  )
}

export default NewChatRoomItems