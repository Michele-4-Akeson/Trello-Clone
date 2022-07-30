import { faSpinner} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Loader = ({blank}) => {
  if (blank) return <></>

  else {
    return (
      <div className='loader'>
        <h3>My Trello App</h3>
        <FontAwesomeIcon className='loader-icon' icon={faSpinner} spin/>
      </div>
  
  )

  }
 
}
