import React, { useContext, useEffect, useState } from 'react'
import { getBoard } from '../../Actions/BackendActions'
import { boardContext } from '../../Contexts/AppContexts'
import {updateObjectArray} from '../../CustomHooks/useArrayState'
import { Loader } from '../Loader'
import { List } from './List'
import * as BackendActions from "../../Actions/BackendActions"
import { AddList } from './AddList'
import { motion, AnimatePresence } from "framer-motion"
import {AddUsers} from "../Other/AddUsers"
import { MessageLog } from '../Log/MessageLog'
import { BoardBar } from './BoardBar'
import { Modal } from '../Other/Modal'
import { faBars, faCommentDots, faCommentSlash, faHamburger, faMessage, faRibbon, faRobot, faTrashArrowUp, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeLog } from '../Log/ChangeLog'


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

export const Board = (props) => {
  const {token, loadedBoard, socket, room, username} = useContext(boardContext)
  const [isLoading, setIsLoading] = useState(true)

  const [modalOpen, setModalOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [lists, setLists] = useState([])
  const [image, setImage] = useState("")
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [logOpen, setLogOpen] = useState(false)
  const [log, setLog] = useState([])
  const [members, setMembers] = useState([username])

  useEffect(()=>{
    loadBoard()
    socket.emit("join-room", room)

    socket.off("add-list").on("add-list", (roomId, list)=>{
      if (room == roomId){
        setLists(lists=>[...lists, list])

      }
   
    }, [])

    socket.off("delete-list").on("delete-list", (deletedList, roomId)=>{
      console.log("client delete", deletedList)
      if (room == roomId){
        setLists(lists=>lists.filter(list=>list.id != deletedList.id))
      }
     
    })


    socket.on("log-sent", (log, logItem, roomId)=>{
      if (room == roomId){
        setLog([...log, logItem])
      }
    })


  }, [])


  useEffect(()=>{
    if (messagesOpen){
      setLogOpen(false)
    }

    if (logOpen){
      setMessagesOpen(false)
    }
  }, [logOpen, messagesOpen])

  async function loadBoard(){
    const response = await getBoard(token, loadedBoard.name, loadedBoard.id)
    console.log("BOARD:", response)
    if (response){
      setLists(response.lists)
      setImage(response.image)
      setMembers([...response.users, username])
      setMessages(response.messages)
      setLog(response.log)
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
      updateObjectArray(lists, setLists, list)
      socket.emit("update-list", room, list);
    }

  }

  async function deleteList(list){
    const response = await BackendActions.deleteList(token, loadedBoard, list)
    console.log("delete response", response)
    setLists(lists.filter(l=>l.id != list.id))
    socket.emit("delete-list", list, room)
    logChange("list " + list.name + " was deleted")
  }


  async function logChange(text){
    const date = dateObj.toLocaleString('en-US', displayOptions);
    const compareTime = dateObj.toLocaleString("en-US", compareOptions)
    const logItem = {text:text, user:username, date:date, compare:compareTime}
    setLog([...log, logItem])
    socket.emit("send-log", log, logItem, room)
    const response = await BackendActions.sendLogMessage(token, loadedBoard, logItem)
    

  }


  function filterDup(list){
    let newList = []

    for (let item of list){
      if (!newList.includes(item)){
        newList.push(item)
      }
    }

    return newList
  }

  if (isLoading){
    return <Loader blank={true}/>

  } else {
    return (
      
        <motion.div 
          key='page'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}>
          <div className='board-background' style={{backgroundImage:`url(${image})`, backgroundRepeat:`no-repeat`, backgroundSize:`cover`}}>
          <div>
            <BoardBar 
              users={users} 
              members={members} 
              setMembers={setMembers} 
              name={loadedBoard.name} 
              modalOpen={modalOpen}
              setModalOpen={setModalOpen} 
              messagesOpen={messagesOpen}
              setMessagesOpen={setMessagesOpen}
              logOpen={logOpen}
              setLogOpen={setLogOpen}/>
            <div className='board'>
              {lists?.map(list=>
                  <List 
                      key={list.id} 
                      name={list.name} 
                      id={list.id} 
                      cards={list.cards} 
                      updateList={updateList}
                      logChange={logChange}
                      deleteList={deleteList}/>)}

              <AddList setLists={setLists} logChange={logChange}/>
            </div>
            
            
            
            {messagesOpen?
              <MessageLog messages={messages}  setMessages={setMessages} setLogOpen={setMessagesOpen} /> : 

              <></>
            }


            {logOpen?
              <ChangeLog log={log} setLog={setLog} setLogOpen={setLogOpen} /> : 

              <></>
            }


            <div>

            </div>
         

            <Modal open={modalOpen} setModalOpen={setModalOpen}>
            <div className='board-modal'>
            <label className='board-modal-header'>Invite member to board</label>
            <hr></hr>


              <div className='split-modal'>
                <div className='left-item'>
                  <AddUsers users={users} members={members} setMembers={setMembers} />
                </div>

                <div className='right-item'>
                  <label>Members</label>
                  <ul className='members-list'>
                    {filterDup(members).map((member, index)=>{
                      return (
                        <div className='user-group'>
                          <div className='dropdown-user-icon-container'>
                              <FontAwesomeIcon className='dropdown-user-icon' icon={faUser}/>
                          </div>
                          <p>{member}</p>
                        </div>
                      )
                    })}
                  </ul>
                 
          
                  
                </div>

              </div>
           
          </div> 
             
            </Modal>

          </div>
        </div>
        </motion.div>
    
     
    )

  }
  
}
