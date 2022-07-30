import React, { useContext, useEffect, useState, useCallback } from 'react'
import { getBoardMessages, sendBoardMessage } from '../../Actions/BackendActions'
import { boardContext } from '../../Contexts/AppContexts'
import { motion, AnimatePresence } from "framer-motion"
import {Message} from "./Message"
import { MessageBar } from './MessageBar'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const ChangeLog = (props) => {
    const {socket, username, loadedBoard, room} = useContext(boardContext)
    const messageRef = useCallback(node=>{
        if (node){
            node.scrollIntoView({smooth:true})
        }
    }, [])

   

    useEffect(()=>{
        socket.on("log-sent", (log, logMessage, roomId)=>{
            if (room == roomId){
                props.setLog([...log, logMessage])
            }
            
        })
    }, [])


  return (
        <motion.div 
        key='change-log'
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
            <MessageBar icon={faBars} title={loadedBoard.name + "'s Change Log"} setLogOpen={props.setLogOpen}/>

            <div className='message-display'>
                {props.log.map((logMessage, index)=>{
                    if (index == props.log.length - 1){
                        return (
                            <div key={index} ref={messageRef} >
                                <Message username={username} sender={logMessage.user} text={logMessage.text} date={logMessage.date} compare={logMessage.compare}/>
                            </div>
                        
                        )
                    
                    } else {
                        return (
                            <div key={index} ref={null}>
                                <Message  username={username} sender={logMessage.user} text={logMessage.text} date={logMessage.date} compare={logMessage.compare}/>
                            </div>
                        
                        )
                    }
                    

                })}

                

            </div>


    </motion.div>
    



    
  )
}
