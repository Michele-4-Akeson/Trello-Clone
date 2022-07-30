import React, { useContext } from 'react'
import { dashboardContext } from '../../Contexts/AppContexts'
import { AddBoard } from './AddBoard'
import { BoardCard } from './BoardCard'

export const Dashboard = (props) => {
  const {username} = useContext(dashboardContext)

  return (
    <div className='dashboard'>
      <h2>{username}'s Boards</h2>
        <div className='board-card-list'>
          {props.boards?.map(board=><BoardCard key={board.id} name={board.name} id={board.id} image={board.image}/>)}
          <AddBoard/>
        </div>

    </div>
  
   
  )
}
