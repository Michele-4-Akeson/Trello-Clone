import React from 'react'
import { BlurForm } from './BlurForm'
import  ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export const Modal = (props) => {
    return ReactDom.createPortal(
        props.open? 
        <div className='ModalOverlay'>
            <motion.div
                key='modal'
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x:0}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}>
                <div className="Modal">
                    <button className='close-modal-button'>
                        <FontAwesomeIcon className='close-modal-icon'  icon={faClose} onClick={()=>props.setModalOpen(false)}/>
                    </button>
                    {props.children}
                </div>
            
            </motion.div>
        </div>
        
        :<div></div>, document.getElementById("modal")
    )
    
}
