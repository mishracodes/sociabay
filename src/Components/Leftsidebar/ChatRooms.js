import React, { useEffect, useState } from 'react'
import './ChatRooms.css'
import ChatRoomItems from './ChatRoomItems'
import {collection, getDocs} from 'firebase/firestore'
import db from '../../firebaseaa'
const ChatRooms = () => {
  const [rooms, setrooms] = useState()



  function getRooms () {
    const roomsCollectionRef = collection(db,"rooms");
    getDocs(roomsCollectionRef)
    .then (response => {
    setrooms(
      response.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }))
    )
  })
    .catch (error => console.log (error.message))
  }
  
  useEffect(() => {
    getRooms();
  }, [])
  //  useEffect(() => {
  //   db.collection("rooms").onSanpshot((snapshot)=>
  //   setrooms(
  //     snapshot.docs.map(doc => ({
  //             id: doc.id,
  //             data: doc.data(),
  //           }))
  //   )
  //   )
  // }, [])
    
  return (
    
    <div className='chatrooms__container'>
      {rooms&& rooms.map((e)=>(
        <ChatRoomItems key={e.id} id={e.id} name={e.data.name}/>
      ))}
    </div>
  )
}

export default ChatRooms