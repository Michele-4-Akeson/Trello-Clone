
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { DropdownItem } from './DropdownItem';
export const NavDropdown = (props) => {
    const dropdownRef = useRef(null);
    return (
      <div className="dropdown" ref={dropdownRef} style={{transform:props.transform?`translateX(${props.transform})`:""}}>
    
            <div className="menu">
                {props.children}
            </div>
                    
       
      </div>
    );
  }