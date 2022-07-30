import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { faBars, faBlog, faMemory, faMessage, faTractor, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { BarItem } from './BarItem'


export const BoardBar = (props) => {
  return (
    <nav className="board-bar">
        <div className="logo">
			<h2><FontAwesomeIcon className='boards-btn-icon' icon={faTrello}/> {props.name} </h2>
		</div>
         
      <ul className="navbar-nav">

        <BarItem icon={faUserPlus} setOpen={props.setModalOpen} open={props.modalOpen}/>
        <BarItem icon={faMessage} setOpen={props.setMessagesOpen} open={props.messagesOpen}/>
        <BarItem icon={faBars} setOpen={props.setLogOpen} open={props.logOpen}/>



      </ul>
    
    </nav>
     
  )
}
