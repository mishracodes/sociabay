import React, { useEffect, useState } from 'react'
import './ChatRooms.css'
import ChatRoomItems from './ChatRoomItems'
import {collection, onSnapshot} from 'firebase/firestore'
import db from '../../firebase'
const ChatRooms = () => {
  const [rooms, setrooms] = useState()
  const [Myemail, setMyemail] = useState("")
  
   useEffect(() => {
    setMyemail(localStorage.getItem("email"))
    const Myemail=localStorage.getItem("email")

      const roomsCollectionRef = collection(db,"users",Myemail,"contacts");
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
        <ChatRoomItems key={e.id} id={e.id} name={e.data.name} profileURL={e.data.profile} Myemail={Myemail}/>
      ))}
    </div>
  )
}

export default ChatRooms