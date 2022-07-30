import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckSquare, faPlusSquare, faUserPlus, faUserFriends, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState } from 'react'

export const NavItem = (props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null)

    function checkClick(){
      if (props.useClick){
        props.useClick()
        setOpen(!open)
      } else{
        setOpen(!open)
      }
    }
  
    return (
      <li ref={ref} onClick={() => checkClick()} className="nav-item">
        <FontAwesomeIcon className="icon-button" style={{color:open?"white":""}} icon={props.icon}  />
        {open && props.children}
      </li>
    )
}