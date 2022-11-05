import React, { useEffect, useState } from 'react'
import NewChatRoomItems from './NewChatRoomItems';
import {collection, onSnapshot} from 'firebase/firestore'
import db from '../../firebase'
const NewChatRooms = () => {
  const [rooms, setrooms] = useState()
  const [Myemail, setMyemail] = useState("")
  
   useEffect(() => {
    setMyemail(localStorage.getItem("email"))

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
      {rooms&& rooms.filter((e)=>e.email!==Myemail).map((e)=>(
        <NewChatRoomItems key={e.id} id={e.id} name={e.data.name} email={e.data.email} profile={e.data.profile} Myemail={Myemail} bio={e.data.about}/>
      ))}
    </div>
  )
}

export default NewChatRooms