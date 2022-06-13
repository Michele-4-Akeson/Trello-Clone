import React, { useContext, useState } from 'react'
import { addBoard } from '../../Actions/BackendActions'
import {nanoid} from 'nanoid'
import  ReactDom from 'react-dom'
import { getImages } from '../../Actions/UnSplashActions'
import { dashboardContext } from '../../Contexts/AppContexts'

export const BoardModal = (props) => {
    const [name, setName] = useState("")
    const [id, setId] = useState(nanoid())
    const [search, setSearch] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [images, setImages] = useState([])
    const {setBoards, username, token} = useContext(dashboardContext)


    async function createBoard(e){
        e.preventDefault()
        const board = {name:name, id:nanoid(), image:imageLink, lists:[]}
        const response = await addBoard(username, token, board)

        if (response.success){
            setBoards(boards=>[...boards, board])
        }


        props.setIsModalOpen(false)
    }


    async function searchImages(e){
        e.preventDefault()
        const response = await getImages(search)

        for (let image of response.results){
            setImages(images=>[...images, image.urls.raw])
        }
    }



   
  return ReactDom.createPortal (
    props.isModalOpen?
    <div>
            <form onSubmit={createBoard}>
                <input required type="text" placeholder="board name..." onChange={(e)=>setName(e.target.value)}/>
            </form>

            <form onSubmit={searchImages}>
                <input required type="text" placeholder="search image" onChange={(e)=>setSearch(e.target.value)}/>
            </form>

            <div className='PictureGrid'>
            {images.map((link, index)=><img className='Picture' key={index} src={link} onClick={()=>setImageLink(link)}/>)}
          </div>
            
    </div> 
    
    :

    <></>, document.getElementById("modal")
    
  )
}
