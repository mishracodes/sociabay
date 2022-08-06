import React, { useContext, useEffect } from 'react'
import './RightMainArea.css'
import {useParams,useLocation} from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import db from '../firebase'
import MainHeader from './Rightmainarea/MainHeader'
import MainChatArea from './Rightmainarea/MainChatArea'
import MainMessagebox from './Rightmainarea/MainMessagebox'
import userContext from '../Context/userContext';

const RightMainArea = () => {
  const {id}=useParams();
  const {name,profileURL}=useLocation().state;
  const context=useContext(userContext)
  const {USER}= context
  console.log("logged in user",USER.name);
  const getDetails = async(id) =>{
    if(id){
      const docRef = doc(db, "rooms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      //  setname(docSnap.data().name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    // if(id){
    //   const roomsCollectionRef = doc(db, "rooms", id);
    //      try {
    //       const docSnap = await getDoc(roomsCollectionRef);
    //       if(docSnap.exists()) {
    //         setname(docSnap.data().name);
    //       } else {
    //           console.log("Document does not exist")
    //       }
    //   } catch(error) {
    //       console.log(error)
    //   }
 

    // }
  }
  useEffect(() => {
    getDetails(id);
  }, [id])


  return (
    <div className='rightMainArea'>
      <MainHeader name={name} profileURL={profileURL}/>
      <MainChatArea id={id} loggedinUser={USER}/>
      <MainMessagebox id={id} />
    </div>
  )
}

export default RightMainArea