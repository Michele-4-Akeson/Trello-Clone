import React, { useContext, useEffect, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts'

export const Checkbox = (props) => {
    const [checked, setChecked] = useState((props.checked))
    const {socket, room} = useContext(boardContext)


    useEffect(()=>{
      socket.on("check", (roomId, checkbox) =>{
        console.log(checkbox)
        if (room == roomId && props.id == checkbox.id){
          setChecked(checkbox.checked)
          props.checkUpdate(checkbox)
        }
      })
    })

    function checkboxClicked(){
        const checkbox = {label:props.label, id:props.id, checked:!checked}
        setChecked(!checked)
        socket.emit("check", room, checkbox)
        props.checkUpdate(checkbox)
    }


  return (
    <div className='checkbox'>
        <input type="checkbox" id={"box"} name={props.id} checked={checked} onChange={()=>checkboxClicked()}/>
        <label htmlFor="box"> {props.label}</label>
        <br/>
    </div>
  )
}
