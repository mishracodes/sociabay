import React, { useEffect, useState } from 'react'
import './RightMainArea.css'
import {useParams} from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import db from '../firebase'

const RightMainArea = () => {
  const {id}=useParams();
  const [name, setname] = useState()

  const getDetails = async(id) =>{
    if(id){
      const docRef = doc(db, "rooms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setname(docSnap.data().name);
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
    <p>{id}</p>
    <p>{name}</p>
    <p></p>
    <p></p>
    
    </div>
  )
}

export default RightMainArea