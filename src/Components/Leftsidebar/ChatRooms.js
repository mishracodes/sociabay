import React, { useEffect, useState } from 'react'
import './ChatRooms.css'
import ChatRoomItems from './ChatRoomItems'
import {collection, onSnapshot} from 'firebase/firestore'
import db from '../../firebase'
const ChatRooms = () => {
  const [rooms, setrooms] = useState()
  const [Myemail, setMyemail] = useState("")
  const [groups, setGroups] = useState()
   useEffect(() => {
    setMyemail(localStorage.getItem("email"))
    const Myemail=localStorage.getItem("email")

    const groupRef = collection(db, "users", Myemail, "groups")

        const groupobserver = onSnapshot(groupRef, docSnapshot => {
            setGroups(
                docSnapshot.docs.map((e)=>({
                    gid:e.id, 
                    data:e.data()
                }))
            )

            // ...
          }, err => {
            console.log(`Encountered error: ${err}`);
          })

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
        groupobserver()
      }
  }, [])
    
  return (
    
    <div className='chatrooms__container'>
      {rooms&& rooms.map((e)=>(
        <ChatRoomItems type="chat" key={e.id} id={e.id} name={e.data.name} profileURL={e.data.profile} Myemail={Myemail}/>
      ))}

{groups && groups.map((e)=>(
                    <ChatRoomItems type="group" key={e.gid} id={e.gid} name={e.data.groupName} profileURL={e.data.profile} Myemail={Myemail}/>
                )
            )}
    </div>
  )
}

export default ChatRooms