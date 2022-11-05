import React, { useContext } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import { Avatar } from '@mui/material';
import mainContext from '../../Context/mainContext';
const NewGroupIcon = () => {
  const context = useContext(mainContext)
  const { newGroupToggle } = context
  return (
    <div className='chatroomitems__container' style={{cursor:"pointer"}} onClick={newGroupToggle}>
      <Avatar>
        <GroupIcon/>
      </Avatar>
      <div className='chatroomitem_detail'>
        <p className='chatroomitem_name'>New Group</p>
      </div>    
    </div>
  )
}

export default NewGroupIcon