import React from 'react'
import { faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavItem } from '../Navbar/NavItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const MessageBar = (props) => {
  return (
    <nav className="message-bar" style={{background:props.background}}>

    <div className="logo">
        <h4> <FontAwesomeIcon icon={props.icon}/> {props.title} </h4>
    </div>
     
  <ul>
    <li onClick={() => props.setLogOpen(false)} className="nav-item">
        <FontAwesomeIcon className="close-button" icon={faClose}  />
      </li>
  </ul>

</nav>
  )
}