import React, { useContext, useEffect, useState, useRef } from 'react'
import { getBoardMessages, sendBoardMessage } from '../../Actions/BackendActions'
import { boardContext } from '../../Contexts/AppContexts'
import { Loader } from '../Loader'
import { motion, AnimatePresence } from "framer-motion"
import {Message} from "./Message"
export const MessageLog = () => {
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [text, setText] = useState("")
    const {socket, token, username, loadedBoard, room} = useContext(boardContext)

    useEffect(()=>{
        loadMessages()

        socket.on("message-sent", (messages, message, roomId)=>{
            if (room == roomId){
                setMessages([...messages, message])
            }
            
        })
    }, [])


    useEffect(()=>{
        if (messageRef.current){
            messageRef.current.scrollIntoView({smooth:true})
        }
    }, [messageRef.current])


    async function loadMessages(){
        const response = await getBoardMessages(token, loadedBoard.name, loadedBoard.id)
        
        if (response){
            console.log(response)
            setMessages(response.messages)
            setIsLoading(false)
        }
    }



    async function sendMessage(e){
        e.preventDefault()
        if (text != ""){
            const date = new Date().toLocaleDateString()
            const message = {user:username, text:text, date:date}
            const response = await sendBoardMessage(token, loadedBoard, message)

            if (response){
                setMessages([...messages, message])
                socket.emit("send-message", messages, message, room)
            }
        }
        
    }

  return (
    <div>
        {isLoading?
            <Loader/>:
            <AnimatePresence exitBeforeEnter>
                 <motion.div 
                    key='log'
                    initial={{opacity:0}}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}>
                    <div style={{width:"200px", height:"200px", background:"white", overflow:"auto"}}>
                        {messages.map((message, index)=>{
                            if (index == messages.length - 1){
                                return <Message ref={messageRef} key={index} username={username} sender={message.user} text={message.text} date={message.date}/>
                            } else {
                                return <Message ref={null} key={index} username={username} sender={message.user} text={message.text} date={message.date}/>
                            }
                            

                        })}
                       
                    </div>
                    <form onSubmit={sendMessage}>
                            <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder={"message...."}/>
                        </form>
                </motion.div>
                
            </AnimatePresence>
      

        }
        
    </div>
  )
}
