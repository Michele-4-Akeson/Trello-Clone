import React, { useContext, useRef, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts';
import {nanoid} from 'nanoid'
import { addList } from '../../Actions/BackendActions';

export const AddList = (props) => {
    const [name, setName] = useState('');
    const [id, setId] = useState(nanoid())
    const componentRef = useRef(null);
    const {loadedBoard, socket, token, room, username} = useContext(boardContext)

    async function createList(e){
        e.preventDefault();
        if (name != ""){
            setId(nanoid());
            const list = {id:id, name:name, cards:[]}
            const response = await addList(token, loadedBoard, list);
            console.log(response)
            if (response.success){
                props.setLists(lists=>[...lists, list])
                socket.emit("add-list", room, list)
                props.logChange("added the list, " + name + ", to the board")
                setName('');
            }
        }
        
    }



  return (
      <form onSubmit={(e)=>{createList(e)}}>
          <input type="text" className="add-list-btn btn" ref={componentRef} value={name} onChange={(e)=>setName(e.target.value)} onBlur={()=>setName("")} placeholder='+ Add another list'/>
      </form>
    
  )
}

