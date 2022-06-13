import React from 'react'

export const Message = (props) => {
console.log(props)

  if (props.username == props.sender){
    return (
        <div>
            <p>{props.text}</p>
            <label>You: {props.date}</label>
        </div>
    )
  } else {
    return (
    <div>
        <p>{props.text}</p>
        <label>{props.sender}: {props.date}</label>
    </div>

    )
  

  }
}
