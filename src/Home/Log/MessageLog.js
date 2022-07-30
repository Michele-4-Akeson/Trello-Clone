import React, { useContext, useEffect, useState, useCallback } from 'react'
import { getBoardMessages, sendBoardMessage } from '../../Actions/BackendActions'
import { boardContext } from '../../Contexts/AppContexts'
import { motion, AnimatePresence } from "framer-motion"
import {Message} from "./Message"
import { MessageBar } from './MessageBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const displayOptions = { 
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

const compareOptions = { 
    hour12: false,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    
};

const dateObj = new Date()
export const MessageLog = (props) => {
    const [text, setText] = useState("")
    const {socket, token, username, loadedBoard, room} = useContext(boardContext)
    const messageRef = useCallback(node=>{
        if (node){
            node.scrollIntoView({smooth:true})
        }
    }, [])

   

    useEffect(()=>{
        socket.on("message-sent", (messages, message, roomId)=>{
            if (room == roomId){
                props.setMessages(messages=>[...messages, message])
            }
            
        })
    }, [])


    async function sendMessage(e){
        e.preventDefault()
        if (text != ""){
            // something like "Thursday, February 14, 2019, 02:55"
            const date = dateObj.toLocaleString('en-US', displayOptions);
            const compareTime = dateObj.toLocaleString("en-US", compareOptions)
            const message = {user:username, text:text, date:date, compare:compareTime}
            const response = await sendBoardMessage(token, loadedBoard, message)

            if (response){
                props.setMessages(messages=>[...messages, message])
                socket.emit("send-message", props.messages, message, room)
                setText("")
            }
        }
        
    }

  return (
        <motion.div 
        key='log'
        className='message-log-container'
        drag
        dragConstraints={{
        top: -50,
        left: -500,
        right: 50,
        bottom: 50,
        }}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x:0}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}>
            <MessageBar icon={faMessage} title={loadedBoard.name + "'s Messages"} setLogOpen={props.setLogOpen}/>

            <div className='message-display'>
                
                {props.messages.map((message, index)=>{
                    if (index == props.messages.length - 1){
                        return (
                            <div key={index} ref={messageRef} >
                                <Message username={username} sender={message.user} text={message.text} date={message.date} compare={message.compare}/>
                            </div>
                        
                        )
                    
                    } else {
                        return (
                            <div key={index} ref={null}>
                                <Message  username={username} sender={message.user} text={message.text} date={message.date} compare={message.compare}/>
                            </div>
                        
                        )
                    }
                    

                })}

                

            </div>

            <form className='send-form' onSubmit={sendMessage}>
                <textarea className='send-input' type="submit" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder={"message...."}/>
                <button type='submit' className='send-button'>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </form>

    </motion.div>
    



    
  )
}
