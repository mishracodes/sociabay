import React, { useContext } from 'react'
import mainContext from '../Context/mainContext'
import './NewGroup.css'
import NewGroupAddedContactList from './NewGroup/NewGroupAddedContactList'
import NewGroupContactListContainer from './NewGroup/NewGroupContactListContainer'
import NewGroupHeader from './NewGroup/NewGroupHeader'

const NewGroup = () => {
    const context = useContext(mainContext)
    const { newChat, newGroupActive } = context

    
    return (
        <div className={`leftSidebar ${newChat ? "hidden" : ""} ${newGroupActive ? "" : "hidden"}`}>
            <NewGroupHeader />
            <NewGroupAddedContactList />
            <NewGroupContactListContainer />
            
        </div>
    )
}

export default NewGroup