import React, { useContext } from 'react'
import { dashboardContext } from '../../Contexts/AppContexts'
import * as BackendActions from "../../Actions/BackendActions"

export const BoardCard = (props) => {
  const {openBoard, token, setBoards, socket} = useContext(dashboardContext)

  
  
  async function deleteBoard(name, id){
    const board = {name:name, id:id}
    const response = await BackendActions.deleteBoard(token, board) // change to deleteSharedBoardAPI call
    console.log(response)
    if (response.success){
        //retreieveProfile(username, password); - via reload
        setBoards(previous=>previous.filter(board=>board.id != id))  
        socket.emit("delete-board", board)
    }
  }

  return (
    <div className="board-card"  style={{backgroundImage:`url(${props.image})`, backgroundRepeat:`no-repeat`, backgroundSize:`cover`}}>
        <h1 className='board-card-text'>{props.name}</h1>
        <div className='board-card-overlay' onClick={()=>{openBoard(props.name, props.id)}}/>
        <button className='board-card-btn' onClick={()=>deleteBoard(props.name, props.id)}>close board</button>
    </div>
  )
}
