import React, { useContext, useEffect, useState } from 'react'
import { BlurForm } from './BlurForm'
import  ReactDom from 'react-dom'
import { boardContext } from '../../Contexts/AppContexts'
import * as BackendActions from "../../Actions/BackendActions"

export const CardModal = (props) => {
    const [description, setDescription] = useState(props.description)
    const {socket, token, loadedBoard, room} = useContext(boardContext)


    useEffect(()=>{
        socket.on("change-card-description", (card, roomId)=>{
            if (room == roomId && props.id == card.id){
              setDescription(card.description)
            }
          })
    }, [])


    async function updateDescription(description){
        setDescription(description)
        const card = {description:description, id:props.id}
        const response = await BackendActions.updateCardDescription(token, loadedBoard, props.listId, card)
        
        if (response.success){
          setDescription(description);
          socket.emit("change-card-description", card, room)
        }
      }
    

    return ReactDom.createPortal(
        props.open? 
        <div className='ModalOverlay'>
       
            <div className="Modal">
                <button onClick={()=>props.setModalOpen(false)}>X</button>
                <BlurForm  inputStyle={"list-title"} value={props.name} setValue={props.setName} submit={()=>props.updateCardName(props.name)} placeholder={"Card Title"}/>
                <h3>Description</h3>
                <BlurForm value={description} setValue={setDescription} submit={()=>updateDescription(description)} placeholder={"Add a description for this card..."}/>

            </div>

        </div>
        
        :<div></div>, document.getElementById("modal")
    )
    
}
