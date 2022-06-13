import React, { useState } from 'react'
import { BoardModal } from '../Other/BoardModal'

export const AddBoard = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
        <button onClick={()=>setIsModalOpen(true)}>Modal</button>
        <BoardModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}
