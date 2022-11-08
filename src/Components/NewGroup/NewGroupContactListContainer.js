import { collection, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import mainContext from '../../Context/mainContext'
import db from '../../firebase'
import NewGroupContactItems from './NewGroupContactItems'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material'

const NewGroupContactListContainer = () => {
    const [myemail, setMyemail] = useState("")
    const context = useContext(mainContext)
    const { setgroupUsersList, groupUsersList, newGroupDetailToggle, groupContactList } = context
    
    const getGroupUsersList = async()=>{
        const UserRef = collection(db, "users")
        const observer = await getDocs(UserRef)
        observer.forEach((docSnapshot)=>{
            let arr=groupUsersList;
            arr.push({id: docSnapshot.id,
                data: docSnapshot.data()})
            setgroupUsersList( arr )
        })
    }
    
    
    useEffect(() => {
        setMyemail(localStorage.getItem("email"))
        getGroupUsersList()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="chatrooms__container">
            {groupUsersList && groupUsersList.map((e) => {
                return (
                    <NewGroupContactItems myemail={myemail} email={e.data.email} key={e.id} id={e.id} name={e.data.name} profile={e.data.profile} bio={e.data.about} />
                )
            })}
            <div className='forwardArrow'>
            {groupContactList.length!==0 ? <IconButton onClick={newGroupDetailToggle} sx={{backgroundColor: "rgb(0,168,132)", height:"46px", width:"46px", ':hover':{backgroundColor:"rgb(0,168,132)"}}}className='forwardArrow-Btn'><ArrowForwardIcon sx={{color:"white", fontSize:"25px", borderRadius:"50%"}}/></IconButton> : ""}
            </div>

        </div>
    )
}

export default NewGroupContactListContainer