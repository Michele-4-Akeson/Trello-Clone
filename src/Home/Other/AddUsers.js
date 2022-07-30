import React, { useContext, useRef, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts';
import * as BackendActions from "../../Actions/BackendActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCheckSquare, faPlusSquare, faUserPlus, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from "framer-motion"

export const AddUsers = (props) => {
    const [search, setSearch] = useState("")
    const [toggle, setToggle] = useState(false);
    const inputRef = useRef(null)
    const {socket, token, loadedBoard, room} = useContext(boardContext)

    function filterSearch(item, search){
        if (search == ""){
            return false;
        } else{
            return item.toLowerCase().includes(search.toLocaleLowerCase())
        }
    }

    
    async function addUser(e, username){
        if (e){
            e.preventDefault()
        }

        const response = await BackendActions.addUser(token, loadedBoard, username)
        socket.emit("join-room", room)
       
  
        if (response.success){
          console.log("adding user", username)
          socket.emit("add-user", username, room);
          props.setMembers(members=>[...members, username])
        }
      }

    
  function focusOnInput(){
    inputRef.current.focus()

  }


      
  
  return (
    <div className='dropdown-container'>
         <form onSubmit={(e)=>addUser(e, search)} className='dropdown-form' onClick={()=>focusOnInput()}>
            <FontAwesomeIcon style={{color:"gray"}} className="dropdown-form-icon" icon={faUserPlus} onClick={()=>focusOnInput()}/>
            <input required 
                ref={inputRef} 
                value={search} 
                onChange={(e)=>{setSearch(e.target.value)}}  
                type="search" placeholder="share with users" 
                onFocus={()=>{setToggle(true)}}/>
        </form>
        
        
        {toggle? 
            <div className='dropdown-list'>
                {(props.users).filter((user)=>filterSearch(user, search)).map((user, index)=>{
                    return (
                        <div className='dropdown-item' key={index} onClick={()=>addUser(null, user)}>
                            <div className='user-group'>
                                <div className='dropdown-user-icon-container'>
                                    <FontAwesomeIcon className='dropdown-user-icon' icon={faUser}/>
                                </div>
                                <p>{user}</p>
                            </div>
                           
                            {props.members.includes(user)? 
                                <motion.div 
                                key='icon'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className='dropdown-check-icon-container'>
                                    <FontAwesomeIcon className='dropdown-check-icon' icon={faCheckSquare}/>
                                </motion.div>
                            :

                            <motion.div 
                            key='iconx'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className='dropdown-check-icon-container'>
                                <FontAwesomeIcon className='dropdown-plus-icon' icon={faPlusSquare}/>
                            </motion.div>
                            }
                        </div>)})}
                    </div>:<></>}
    </div>
  )

}
