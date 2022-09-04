import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts'
import { Checkbox } from '../Other/Checkbox'

export const Checklist = (props) => {
    const [label, setLabel] = useState("")
    const {socket, room} = useContext(boardContext)
    
    useEffect(()=>{
  

     
      
      
    }, [])


    function addCheckbox(e){
        e.preventDefault()
        if (label != ""){
            const checkbox = {label:label, id:nanoid(), checked:false}
            props.addCheckbox(checkbox)
        }
        
    }

    function checkUpdate(checkbox){
      props.updateCheckbox(checkbox)
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
            {props.checklist?.map((checkbox, index)=>
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
