import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './NavDropdown';
import { DropdownItem } from './DropdownItem';
import { faCake, faClose } from '@fortawesome/free-solid-svg-icons';
export const NavSearch = (props) => {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null)

    function filterSearch(item, search){
        if (search == ""){
            return true;
        } else{
            return item.toLowerCase().includes(search.toLocaleLowerCase())
        }
    }

    function goTo(e, boardName, boardId){
        console.log(boardName, boardId, props.boards)
        if (e){
            e.preventDefault()
        }
        if (boardId){
            props.switchBoard(boardName, boardId)
            setSearch("")

        } else {
            for (let board of props.boards){
                if (board.name == boardName){
                    props.switchBoard(board.name, board.id)
                    setSearch("")
                    return
                }
            }
        }
      
    }

    
    function focusOnInput(){
        inputRef.current.focus()

    }
    
    
  return (
    <div className='nav-search-item'>
        <form onSubmit={(e)=>goTo(e, search)} className='nav-form'>
            <FontAwesomeIcon style={{color:"white"}} className="nav-form-icon" icon={props.icon}/>
            <input 
                required 
                style={{color:"white"}}
                value={search} 
                onChange={(e)=>{setSearch(e.target.value)}}  
                type="text" 
                placeholder="..." 
                onFocus={()=>{setOpen(true)}}
                />
            <FontAwesomeIcon style={{color:"white", marginRight:"10px", visibility:open?"visible":"hidden"}} className="nav-form-icon" icon={faClose} onClick={()=>setOpen(false)}/>
        </form>

        {open? 
            <NavDropdown transform={"15%"}>
                  {
                  (props.boards).filter((board)=>filterSearch(board.name, search)).map((board, index)=>{
                    return (
                        <a className="menu-item" key={index} onClick={()=>{goTo(null, board.name, board.id)}}>
                            <img className='search-board-icon' src={board.image}/>
                            <p className='item-label'>{board.name}</p>
                        </a>
                    )
                })}
            
            </NavDropdown>
              
            
            :
            
            <></>}
    </div>
  )
}
