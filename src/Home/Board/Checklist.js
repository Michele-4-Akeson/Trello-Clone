import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts'
import { Checkbox } from '../Other/Checkbox'

export const Checklist = (props) => {
    const [label, setLabel] = useState("")
    const [checklist, setChecklist] = useState(props.checklist)
    const {socket, room} = useContext(boardContext)
    
    useEffect(()=>{
        socket.on("add-checkbox", (card, roomId, checklist, checkbox)=>{
            if (room == roomId && props.cardId == card.id){
              setChecklist([...checklist, checkbox])
            }
          })

     
      
      
    }, [])


    function addCheckbox(e){
        e.preventDefault()
        if (label != ""){
            const checkbox = {label:label, id:nanoid(), checked:false}
            props.addCheckbox(checklist, checkbox)
            setChecklist([...checklist, checkbox])
            setLabel("")
        }
        
    }

    function checkUpdate(checkbox){
      console.log("xxx")
      props.updateCheckbox(checklist, checkbox)
    }


    

  return (
    <div className='checklist-container'>
          <form onSubmit={addCheckbox}>
            <input type="text" value={label} onChange={(e)=>setLabel(e.target.value)}/>
            <button type='submit'>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </form>
         <div className='checklist'>
            {checklist?.map((checkbox, index)=>
              <Checkbox 
                key={index} 
                label={checkbox.label} 
                id={checkbox.id} 
                checked={checkbox.checked}
                checkUpdate={checkUpdate}/>)}
        </div>

      

    </div>
       
   


  )
}
