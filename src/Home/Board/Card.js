import React, { useContext, useEffect, useRef, useState } from 'react'
import { boardContext } from '../../Contexts/AppContexts';
import * as BackendActions from "../../Actions/BackendActions"
import { CardModal } from '../Other/CardModal';


export const Card = (props) => {
  const [name, setName] = useState(props.name)
  const [id, setId] = useState(props.id)
  const [previousName, setPreviousName] = useState(props.name);
  const {socket, token, loadedBoard, room} = useContext(boardContext)
  const [modalOpen, setModalOpen] = useState(false);

  
  useEffect(()=>{
    socket.on("change-card-name", (card, roomId)=>{
      if (room == roomId && id == card.id){
        setName(card.name)
        setPreviousName(card.name)
      }
    })


   
  }, [])


async function updateCardName(){
  if (name != ""){
    const card = {name:name, id:id}
    const response = await  BackendActions.updateCardName(token, loadedBoard, props.listId, card)
    if (response.success){
      setName(name);
      setPreviousName(name);
      socket.emit("change-card-name", card, room)
    }

  } else{
    setName(previousName)
  }
  
}






return (
  <div >
    <li onClick={()=>setModalOpen(true)}>
      {name}
    </li>
    
    <CardModal 
      name={name} 
      id={id}
      listId={props.listId}
      setName={setName} 
      description={props.description} 
      open={modalOpen} 
      setModalOpen={setModalOpen}
      updateCardName={updateCardName}/> 
  </div>
)

}