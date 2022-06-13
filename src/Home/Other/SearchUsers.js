import React, { useContext, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts';
import * as BackendActions from "../../Actions/BackendActions"
export const SearchUsers = (props) => {
    const [search, setSearch] = useState("")
    const [toggle, setToggle] = useState(false);
    const {socket, token, loadedBoard, room} = useContext(boardContext)

    function filterSearch(user, search){
        if (search == ""){
            return false;
        } else{
            return user.toLowerCase().includes(search.toLocaleLowerCase())
        }
    }

    
    async function addUser(username){
        const response = await BackendActions.addUser(token, loadedBoard, username)
        socket.emit("join-room", room)
       
  
        if (response.success){
          console.log("adding user", username)
          socket.emit("add-user", username, room);
          
        }
      }

      
  
  return (
    <div>
        <input className='LoginInput' required={true} type="text" value={search} placeholder="Share" onChange={(e)=>setSearch(e.target.value)} onFocus={()=>{setToggle(true)}}/>
        {toggle? 
            <ul className='Dropdown'>
                {(props.users).filter((user)=>filterSearch(user, search)).map((user, index)=><li  key={index} onClick={()=>addUser(user)}>{user}</li>)}
            </ul>:<></>}
    </div>
  )

}
