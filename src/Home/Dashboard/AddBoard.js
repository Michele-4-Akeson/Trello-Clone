import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrello} from "@fortawesome/free-brands-svg-icons"
import { nanoid} from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import { addBoard } from '../../Actions/BackendActions'
import { getImages } from '../../Actions/UnSplashActions'
import { dashboardContext } from '../../Contexts/AppContexts'
import { Modal } from '../Other/Modal'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const defaults = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

export const AddBoard = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [name, setName] = useState("")
    const [id, setId] = useState(nanoid())
    const [search, setSearch] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [images, setImages] = useState([])
    const {setBoards, username, token} = useContext(dashboardContext)

    useEffect(()=>{
      getRandom()

    }, [])

    async function createBoard(e){
        e.preventDefault()
        const board = {name:name, id:nanoid(), image:imageLink, lists:[]}
        const response = await addBoard(username, token, board)

        if (response.success){
            setBoards(boards=>[...boards, board])
            setImages([])
        }

        setModalOpen(false)
    }


    async function searchImages(e){
        e.preventDefault()
        const response = await getImages(search)
        let imageList = []
        for (let image of response.results){
          imageList.push(image.urls.raw)
           
        }
        setImages(imageList)
    }
  
    async function getRandom(){
      const response = await getImages(defaults[Math.floor(Math.random() * 10)])
      let imageList = []
      for (let image of response.results){
        imageList.push(image.urls.raw)
         
      }
      //setImages(imageList)
      setImageLink(imageList[1])

    }



  return (
    <div>
        <button className='add-board-btn' onClick={()=>setModalOpen(true)}>
          Create new board
          <FontAwesomeIcon icon={faPlus}/>

        </button>


        <Modal open={isModalOpen} setModalOpen={setModalOpen}>
          <div className='board-modal'>
            <label className='board-modal-header'>Create board</label>
            <hr></hr>

              <form className='board-modal-form' onSubmit={createBoard}>
                  <label>Board title</label>
                  <input required type="text" onChange={(e)=>setName(e.target.value)}/>
              </form>

              <div className='split-modal'>
                <div className='left-item'>
                  <form  className="board-modal-form" onSubmit={searchImages}>
                      <label>Background</label>
                      <input required type="text" onChange={(e)=>setSearch(e.target.value)}/>
                  </form>
                  <div className='PictureGrid'>
                  {images.map((link, index)=><img className='Picture' key={index} src={link} onClick={()=>setImageLink(link)}/>)}
                  </div>
                </div>

                <div className='right-item'>
                  <label>Preview</label>
                  <div className='board-preview' style={{"backgroundImage":`url(${imageLink})`, backgroundRepeat:`no-repeat`, backgroundSize:`cover`}}>
                    <FontAwesomeIcon style={{color:"white", marginTop:"20px"}} icon={faTrello}/>

                  </div>
                   
          
                  
                </div>

              </div>
           
          </div> 

        </Modal>
        
    </div>
  )
}
