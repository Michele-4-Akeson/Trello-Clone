import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckSquare, faPlusSquare, faUserPlus, faUserFriends, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState } from 'react'

export const BarItem = (props) => {
    const ref = useRef(null)

  
  
    return (
      <li ref={ref} onClick={() => props.setOpen(!props.open)} className="board-bar-item">
        <FontAwesomeIcon className="board-bar-icon-button" style={{color:props.open?"#484a4d":""}} icon={props.icon}  />
        {props.open && props.children}
      </li>
    )
}
