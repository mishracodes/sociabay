import React, { useEffect, useState } from 'react'
import './CommonGroupContainer.css'
import {collection, onSnapshot} from 'firebase/firestore'
import db from '../../firebase'
import CommonGroupItems from './CommonGroupItems'
const CommonGroupContainer = () => {
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
    <div>
      {rooms&& rooms.filter((e)=>(e.data.name==='EOD Run Team')).map((e)=>(
        <CommonGroupItems key={e.id} id={e.id} name={e.data.name} profileURL={e.data.profileURL}/>
      ))}
    </div>
  )
}

export default CommonGroupContainer