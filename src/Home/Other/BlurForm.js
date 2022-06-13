import React, { useRef } from 'react'

export const BlurForm = (props) => {
    const componentRef = useRef(null)

    function enterForm(e){
        /*
        enterForm is called when a user hits enter on a Input of the CustomForm.
        This results in submitFrom being called which calls the onSubmit to be called
        */
        e.preventDefault()
        componentRef.current.blur(); // component calls updateListName() on blur() -> thus when we blur from the component, we check if it needs to update -> this handles the submit
    }

  return (
    <form onSubmit={(e)=>enterForm(e)}>
        <input ref={componentRef} className={props.inputStyle} type="text" value={props.value} onChange={(e)=>props.setValue(e.target.value)} onBlur={props.submit} placeholder={props.placeholder}/>
    </form>
  )
}
