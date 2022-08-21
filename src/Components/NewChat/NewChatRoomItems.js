import React, {  useEffect, useState } from 'react'
import { Avatar } from '@mui/material'; 
import {Link} from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore';
import db from "../../firebase";
import MD5 from 'crypto-js/md5';
const NewChatRoomItems = ({id,name,profile,email,Myemail}) => {
  const [concat, setconcat] = useState("");
  const hashCalc=()=>{
    return MD5(concat).toString()
  }
  const addConnection =()=>{
   setDoc(doc(db, "users",Myemail,"contacts",email),{uid:hashCalc()});
   setDoc(doc(db, "users",email,"contacts",Myemail),{uid:hashCalc()});

  }

  useEffect(() => {
    if(Myemail.charAt(0)>email.charAt(0)){
      setconcat(email+Myemail);
    }
    else{
      setconcat(Myemail+email);
    }
  }, [email,Myemail])
  
  
  
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