import React, { useContext, useEffect, useState } from 'react'
import { getBoard } from '../../Actions/BackendActions'
import { boardContext } from '../../Contexts/AppContexts'
import setArrayState from '../../CustomHooks/useArrayState'
import { Loader } from '../Loader'
import { List } from './List'
import * as BackendActions from "../../Actions/BackendActions"
import { AddList } from './AddList'
import { motion, AnimatePresence } from "framer-motion"
import { SearchUsers } from '../Other/SearchUsers'

export const Board = (props) => {
  const {token, loadedBoard, socket, room} = useContext(boardContext)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [board, setBoard] = useState(null)
  const [lists, setLists] = useState([])
  const [image, setImage] = useState("")



  useEffect(()=>{
    loadBoard()
    socket.emit("join-room", room)

    socket.off("add-list").on("add-list", (roomId, list)=>{
      if (room == roomId){
        setLists(lists=>[...lists, list])

      }
   
    })

    socket.off("delete-list").on("delete-list", (deletedList, roomId)=>{
      console.log("client delete", deletedList)
      if (room == roomId){
        setLists(lists=>lists.filter(list=>list.id != deletedList.id))
      }
     
    })


  }, [])

  async function loadBoard(){
    const response = await getBoard(token, loadedBoard.name, loadedBoard.id)
    if (response){
      setBoard(response)
      setLists(response.lists)
      setImage(response.image)
    }

    await getUsers()
    setIsLoading(false)
  }

  async function getUsers(){
    const response = await BackendActions.getAllUsers()
    if (response != []){
      console.log(response)
      let userlist = []
      for (let user of response){
        userlist.push(user.username)
      }
      setUsers(userlist)
    }
  }


  async function updateList(list){
    const response = await BackendActions.updateList(token, loadedBoard, list)
    if (response.success){
      setArrayState(lists, setLists, list)
      socket.emit("update-list", room, list);
    }

  }

  async function deleteList(list){
    const response = await BackendActions.deleteList(token, loadedBoard, list)
    console.log("delete response", response)
    if (response){
      setLists(lists.filter(l=>l.id != list.id))
      socket.emit("delete-list", list, room)

    }

  }



 

  if (isLoading){
    return <Loader/>

  } else {
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div 
          key='lists'
          initial={ false }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}>
          <div className='BoardBackground' style={{backgroundImage:`url(${image})`, backgroundRepeat:`no-repeat`, backgroundSize:`cover`}}>
          <div>
            <SearchUsers users={users}/>
            <div className='Board'>
              {lists?.map(list=><List key={list.id} name={list.name} id={list.id} cards={list.cards} updateList={updateList} deleteList={deleteList}/>)}
            </div>
            <AddList setLists={setLists}/>
          </div>
        </div>
        </motion.div>
      </AnimatePresence>
     
    )

  }
  
}
