import React from 'react'
const dateObj = new Date()
const compareOptions = { 
  hour12: false,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  
};
export const Message = (props) => {


  function displayDate(sentTime){
      const currentTime = dateObj.toLocaleString("en-US", compareOptions)
      console.log(props, currentTime)
      if (sentTime == currentTime){
        return false
      }

      return true

  }


  if (props.username == props.sender){
    return (
        <div className='sent-message-container'>
          {displayDate(props.compare)?
            <div className='message-label'>
              <label>{props.date}</label>
            </div>
         
          :<></>}
         
          <p className='sent-message'>{props.text}</p>
            
        </div>
    )
  } else {
    return (
    <div className='recivied-message-container'>
          {displayDate(props.compare)?
          <div className='message-label'>
            <label>{props.date}</label>
            <label style={{"textAlign":"center"}}>{props.sender}</label>
          </div>
            
          :
          
          <div className='message-label'>
            <label style={{"textAlign":"center"}}>{props.sender}</label>
          </div>}
      
       
        <p className='recivied-message'>{props.text}</p>
       
        
       
    </div>

    )
  

  }
}
