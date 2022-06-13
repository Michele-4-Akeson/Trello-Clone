import React, { useEffect, useState } from 'react'
import { Board } from './Board/Board'
import { Dashboard } from './Dashboard/Dashboard'
import { Loader } from './Loader'
import { motion, AnimatePresence } from "framer-motion"
import { getAllBoards, getProfile } from '../Actions/BackendActions'
import { dashboardContext, boardContext } from '../Contexts/AppContexts'

export const Home = (props) => {
    const [onDashboard, setOnDashbaord] = useState(true)
    const [onBoard, setOnBoard] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [boards, setBoards] = useState(null)
    const [board, setBoard] = useState(null)


    useEffect(()=>{
        loadPage()

        props.socket.on("added-to-room", (username, roomId)=>{
            loadBoards();
            props.socket.emit("join-room", roomId)

        })

        props.socket.on("delete-board", (deletedBoard)=>{
            console.log("delete", deletedBoard)
            setBoards(previous=>previous.filter(board=>board.id != deletedBoard.id))
        })

    }, [])


    useEffect(()=>{
        if (username){
            props.socket.emit("logged-on", username, props.token)
        }
    }, [username])


   



    async function loadPage(){
        await loadProfile()
        await loadBoards()

        setIsLoading(false)
    }

    async function loadProfile(){
        const response = await getProfile(props.token)
        if (response){
            setUsername(response.username)
        }

        
    }

    async function loadBoards(){
        const response = await getAllBoards(props.token)
        if (response){
            setBoards(response.boards)
            console.log(response.boards)
            props.socket.emit("join-all", response.boards)
        }

    }


    function openBoard(name, id){
        setBoard({name:name, id:id})
        switchPage("board")
        
        

    }


    

    function switchPage(page){
        setOnDashbaord(false)
        setOnBoard(false)
        switch(page){
            case "dashboard":
                setBoard(null)
                setOnDashbaord(true)
                break
            case "board":
                setOnBoard(true)
                break
            case "login":
                props.signOut()
                break
        }
    }



    if (isLoading){
        return (
            <Loader/>
        )

    } else {
        return (
            <div>
                <AnimatePresence exitBeforeEnter>
                {onDashboard?
                    <motion.div
                    key='dashboard'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}>
                    <dashboardContext.Provider value={{setBoards, token:props.token, username, openBoard, socket:props.socket}}>
                        <Dashboard boards={boards}/>
                    </dashboardContext.Provider>
                  
                    </motion.div>
                    
                
                :
    
                <motion.div
                    key='board'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}>
                        <boardContext.Provider value={{token:props.token, loadedBoard:board, socket:props.socket, room:board.id, username}}>
                            <Board/>  
                        </boardContext.Provider>
                </motion.div>
    
    
                }
    
    
            </AnimatePresence>
            </div>
        )

    }

   
}
