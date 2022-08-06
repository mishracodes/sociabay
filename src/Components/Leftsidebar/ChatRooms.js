import React, { useEffect, useState } from 'react'
import './ChatRooms.css'
import ChatRoomItems from './ChatRoomItems'
import {collection, onSnapshot} from 'firebase/firestore'
import db from '../../firebaseaa'
const ChatRooms = () => {
  const [rooms, setrooms] = useState()
  
   useEffect(() => {
      const roomsCollectionRef = collection(db,"rooms");
      const unsub = onSnapshot(roomsCollectionRef,(response) => {
      setrooms(
        response.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
        )
      })
      return ()=>{
        unsub()
      }
  }, [])
    
  return (
    
    <div className='chatrooms__container'>
      {rooms&& rooms.map((e)=>(
        <ChatRoomItems key={e.id} id={e.id} name={e.data.name} profileURL={e.data.profileURL}/>
      ))}
    </div>
  )
}

export default ChatRooms