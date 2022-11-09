import React, { useContext, useEffect, useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import { Avatar, IconButton } from '@mui/material';
import mainContext from '../../../Context/mainContext';
import db, {storage} from "../../../firebase";
import { v4 } from "uuid";
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
const Details = () => {
  const context = useContext(mainContext)
  const {addGroupToggle, groupContactList} = context
  const [groupId, setGroupId] = useState("")
  const [profileUrl, setProfileUrl] = useState("")
  const [newGroupName, setnewGroupName] = useState("")
  const [AvatarSrc, setAvatarSrc] = useState("")
  const [imageUpload, setImageUpload] = useState(null);
  const inputHandler=(event)=>{
    setnewGroupName(event.target.value)
  }
  const groupHandler=async ()=>{
    if (imageUpload == null) return;

    const imageRef = ref(storage, `groupIcons/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        setProfileUrl(url)
        const docRef = await addDoc(collection(db, "Groups"), {
          groupName: newGroupName,
          profile: url
          
        });
        setGroupId(docRef.id)
        
       
      });
    });
  }

  const submitHandler=(event)=>{
event.preventDefault()
  }

  const imagePicker=(event)=>{
    setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    setImageUpload(event.target.files[0]);
    
}


const addParticipantsToGroupdb= ()=>{
 groupContactList.forEach((item)=>{
 const groupRef = collection(db, "Groups", groupId, "members")
 
   addDoc(groupRef, {
     name: item.data.name,
     profile: item.data.profile,
     email: item.id
   })
   setDoc(doc(db, "users", item.id, "groups", groupId), {
    groupName: newGroupName,
    profile: profileUrl
  })
 })
}

useEffect(() => {
 if(groupId!==""){
 setDoc(doc(db, "users", localStorage.getItem("email"), "groups", groupId), {
     groupName: newGroupName,
         profile: profileUrl
   })
   addGroupToggle()
   addParticipantsToGroupdb()

 }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [groupId])

  return (
    <div className={`leftSidebar PersonalDetails__container`}>
    <div className="PersonalDetails__Subcontainer">
      <div className="PDprofilePicSection">
        <Avatar  src={AvatarSrc} sx={{width:"200px",height:"200px", position:"relative", cursor:"pointer"}}>
          <GroupsIcon sx={{width:"130px",height:"130px", position:"absolute"}}/>
        </Avatar>
        <IconButton  sx={{position:'absolute', right:'12px', bottom:'17px',color:'white',backgroundColor:'#cccccc5d'}}
            // onClick={handleClick}
            ><label style={{width:'20px', height:'20px',display:"flex",}}  htmlFor='groupImageUpload'>
            <EditIcon style={{ width:'20px', height:'20px'}}/></label>
            </IconButton>
        <input style={{display:'none'}}  onChange={imagePicker} type='file' id='groupImageUpload'/> 
      </div>

      <div className="PersonalDetails__details">
      <form className='searchrooms__form newGroupNameInput' onSubmit={submitHandler}>
        <input value={newGroupName} onChange={inputHandler} className='searchrooms__input' type='text' placeholder='Group Subject'/>
      </form>

      </div>
      <div className='newGroupSubmitDiv'>
      {newGroupName!==0&&<IconButton onClick={groupHandler}>
        <ArrowCircleRightIcon sx={{width:'40px', height:'40px',color:"#343645"}}/>
      </IconButton>}
      </div>
      
      </div>
    </div>
  )
}

export default Details