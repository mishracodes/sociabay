import React, { useEffect, useState } from 'react'
import NewChatRoomItems from './NewChatRoomItems';
import {collection, onSnapshot} from 'firebase/firestore'
import db from '../../firebase'
const NewChatRooms = () => {
  const [rooms, setrooms] = useState()
  
   useEffect(() => {
      const roomsCollectionRef = collection(db,"users");
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
        <NewChatRoomItems key={e.id} id={e.id} name={e.data.name} profile={e.data.profile}/>
      ))}
    </div>
  )
}

export default NewChatRooms