import React, { useContext, useEffect, useRef, useState } from 'react'
import {nanoid} from 'nanoid'
import { BlurForm } from '../Other/BlurForm';
import { boardContext } from '../../Contexts/AppContexts';
import * as BackendActions from "../../Actions/BackendActions"

import { Card } from './Card';

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


        socket.on("delete-card", (listId, cards)=>{
            if (id == listId){
                console.log("client delete card", cards)
                try {
                    setCards(cards);
                    
                } catch (error){
                    console.log(error)
                }  
            }
        })


       


    }, [])

    async function changeName(){
        if (name == ""){
            setName(previousName);
        } else if (name != previousName){
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
            const card = {name:cardName, id:nanoid()}
            const response = await BackendActions.addCard(token, loadedBoard, list, card); // change to sharedCard add
            console.log(response.success)
            if (response.success){
                setCards([...cards, card])
                socket.emit("add-card", list, cards, loadedBoard.id, card)
                setCardName("");
                
            }

           
        }
    }

    async function acceptCard(cardName, cardId, listId){
        if (id != listId){
            console.log("card accepted" , cardName)
            const list = {name:name, id:id}
            const card = {name:cardName, id:cardId}
            const addResponse = await BackendActions.addCard(token, loadedBoard, list, card)
            if (addResponse.success){
                setCards([...cards, card])
                socket.emit("add-card", list, cards, loadedBoard.id, card)
                
            } 
        }
      
    }



    async function deleteCard(cardName, cardId){
        console.log(cardId, cardName)
        const card = {name:cardName, id:cardId}
        const response = await BackendActions.deleteCard(token, loadedBoard, id, card);

        if (response.success){
            setCards(cards.filter(c=>c.id != card.id));
            socket.emit("delete-card", id, cards, loadedBoard.id)

            
           
        }
    }


  return (
        <div className="list">
            <BlurForm inputStyle={"list-title"} value={name} setValue={setName} submit={changeName}/>
            <button onClick={()=>{props.deleteList({name, id})}}>delete List</button>

            <ul  className="list-items">
                {cards?.map(card=><Card key={card.id} name={card.name} id={card.id} description={card.description} checklist={card.checklist} listId={id} deleteCard={deleteCard}/>)}
            </ul>

            <form onSubmit={(e)=>addCard(e)}>
                <input className='add-card-btn btn' type="text" value={cardName} onChange={(e)=>setCardName(e.target.value)} placeholder="Add a card"/>
            </form>
        </div>


     
  )
}

