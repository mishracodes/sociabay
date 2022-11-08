import React, { useContext } from 'react'
import mainContext from '../../../Context/mainContext'
import Details from './Details'
import Header from './Header'
import './NewGroupDetails.css'
const NewGroupDetails = () => {
    const context = useContext(mainContext)
    const { newGroupDetails } = context
    return (
      <div className={`leftSidebar`}>
          <Header/>
          <Details/>
          {newGroupDetails}
      </div>
    )
  }

export default NewGroupDetails