import React from 'react'
import { AddBoard } from './AddBoard'
import { BoardCard } from './BoardCard'

export const Dashboard = (props) => {
  return (
    <div>
        {props.boards?.map(board=><BoardCard key={board.id} name={board.name} id={board.id} image={board.image}/>)}
        <AddBoard/>
    </div>
   
  )
}
