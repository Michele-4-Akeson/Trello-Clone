import React, { useContext, useEffect, useRef, useState } from 'react'
import {nanoid} from 'nanoid'
import { BlurForm } from '../Other/BlurForm';
import { boardContext } from '../../Contexts/AppContexts';
import * as BackendActions from "../../Actions/BackendActions"
import { Card } from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const List = (props) => {
    const {loadedBoard, socket, token, room} = useContext(boardContext)
    const [name, setName] = useState(props.name); // local variable - may not change if property changes in parent componet??
    const [id, setId] = useState(props.id);
    const [previousName, setPreviousName] = useState(props.name);
    const [cards, setCards] = useState(props.cards)
    const [cardName, setCardName] = useState("")


    useEffect(()=>{
        socket.on("update-list", (roomId, list)=>{
            console.log(list)
            if (roomId == room && id == list.id){
                setName(list.name)
            }
        })

        socket.on("add-card", (list, cards, card)=>{
            if (id == list.id){
                console.log("client update card" , cards)
                try {
                    setCards([...cards, card])
                } catch (error){
                    console.log(error)
                    
                }
            }
                
               
        })

     

        socket.on("delete-card", (listId, cards, card)=>{
            if (id == listId){
                console.log(cards)
                setCards(cards.filter(c=>c.id!=card.id))
            }
        })


       


    }, [])

    async function changeName(){
        if (name == ""){
            setName(previousName);
        } else if (name != previousName){
            props.logChange("changed " + previousName + "'s list name to " +  name)
            setPreviousName(name);
            setName(name)
            const list = {name:name, id:id, cards:cards}
            props.updateList(list)
        }
    }

    

    async function addCard(e){
        e.preventDefault()
        if (cardName != ""){
            const list = {name:name, id:id, description:""}
            const card = {name:cardName, id:nanoid(), description:"", checklist:[]}
            const response = await BackendActions.addCard(token, loadedBoard, list, card); // change to sharedCard add
            console.log(response.success)
            if (response.success){
                setCards([...cards, card])
                socket.emit("add-card", list, cards, loadedBoard.id, card)
                props.logChange("added " + cardName + " card to list " + name)
                setCardName("");
                
            }

           
        }
    }

    async function deleteCard(cardName, cardId){
        console.log(cardId, cardName)
        const card = {name:cardName, id:cardId}
        const response = await BackendActions.deleteCard(token, loadedBoard, id, card);

        if (response.success){
            setCards(cards.filter(c=>c.id != card.id));
            socket.emit("delete-card", id, cards, card, loadedBoard.id)  
            props.logChange("deleted " + cardName + " card from list " + name)
        }
    }





  return (
        <div className="list">
             <div onClick={()=>{props.deleteList({name, id})}} className="list-delete-btn">
                <FontAwesomeIcon  icon={faTrashAlt}  />
            </div>
            <BlurForm inputStyle={"list-title"} value={name} setValue={setName} submit={changeName}/>
           
            <ul className="list-items">
                {cards?.map(card=><Card 
                key={card.id} 
                name={card.name} 
                id={card.id} 
                description={card.description} 
                checklist={card.checklist} 
                listId={id}
                logChange={props.logChange}
                deleteCard={deleteCard}/>)}
            </ul>

            <form onSubmit={(e)=>addCard(e)}>
                <input className='add-card-btn btn' type="text" value={cardName} onChange={(e)=>setCardName(e.target.value)} placeholder="Add a card"/>
            </form>

           
        </div>


     
  )
}

