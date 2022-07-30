import React from 'react'
import { faGear, faSignOut, faPaintBrush, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavItem } from './NavItem'
import { NavDropdown } from './NavDropdown'
import { DropdownItem } from './DropdownItem'
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { NavSearch } from './NavSearch'
export const Navbar = (props) => {
  return (
    <nav className="navbar">

        <div className="logo">
			<h2><FontAwesomeIcon className='boards-btn-icon' icon={faTrello}/>My Trello App</h2>
		</div>
         
      <ul className="navbar-nav">
     
        <NavItem icon={faHome} useClick={()=>props.switchPage("dashboard")}/>
        <NavSearch icon={faSearch} switchBoard={props.switchBoard} boards={props.boards}/>

        <NavItem icon={faGear}>
            <NavDropdown transform={"35%"}>
                <DropdownItem
                    icon={faSignOut}
                    label={"Sign out"}
                    useClick={()=>props.signOut()}>
                </DropdownItem>
            </NavDropdown>
        </NavItem>

       


         
      </ul>
    
    </nav>
     
  )
}
