import React from 'react'

import { faUser, faCheckSquare, faPlusSquare, faUserPlus, faUserFriends, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const DropdownItem = (props) => {
    return (
      <a className="menu-item" onClick={()=>props.useClick()}>
          <FontAwesomeIcon className="icon-left"icon={props.icon}/>
          <p className='item-label'>{props.label}</p>
      </a>
    );
  }
