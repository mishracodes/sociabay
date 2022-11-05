import { Avatar } from '@mui/material'
import React, { useContext } from 'react'
import mainContext from '../../Context/mainContext'

const NewGroupContactItems = (props) => {
    const {profile, name, email, myemail,bio} = props
    const context = useContext(mainContext)
    const { addParticipantsToGroup } = context
    

  return (
    <div onClick={()=>{addParticipantsToGroup(email, myemail, name, profile)}} className='chatroomitems__container'>
          
          <Avatar src={profile}/>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>{name}</p>
        <p className='chatroomitem_bio'>{bio}</p>
      </div> 
       
    </div>
  )
}

export default NewGroupContactItems