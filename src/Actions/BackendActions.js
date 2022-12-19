

import {nanoid} from 'nanoid'


const url = process.env.REACT_APP_BACKEND_URL || "https://my-trello-backend-vgmy.onrender.com" || "http://localhost:5000/"
console.log(url)
const profilePath = "profile"
const boardPath = "board"
const listPath = "list"
const cardPath = "card"
const messagePath = "message"



 
 ////////////////////////////////////////////////////////
 // Login
 ////////////////////////////////////////////////////////


 export async function getToken(username, password){
  try {
    const response = await fetch(url + profilePath + "/token" + "?username=" + username + "&" + "password=" + password, {
      method:"GET",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
    });

    return response.json()

  } catch (error){
    console.log(error);
  }

 }



 export async function getProfile(token){
  try {
    const response = await fetch(url + profilePath + "?token=" + token, {
      method:"GET",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
    });

    return response.json()

  } catch (error){
    console.log(error);
  }
  

 }





 export async function createProfile(username, password){
   /*
   createProfile() will make a POST request to the backend to create a document in a collection of
   mongoDB
   */
  try{
    const response = await fetch(url + profilePath, {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({username:username, password:password, token:nanoid()})
    });

    return response.json()

  } catch (error) {
    console.log(error);

  }


 }


 ////////////////////////////////////////////////////////
 // BOARDS:
 ////////////////////////////////////////////////////////

 export async function getAllBoards(token){
  try {
    const response = await fetch(url + boardPath + "/all" + "?token=" + token, {
    method:"GET",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"},
    });

    return response.json()

  } catch (error){
    console.log(error);
  }
  


 }


 export async function getBoard(token, name, id){
  try {
    console.log(token, name, id)
    const response = await fetch(url + boardPath + "?token=" + token + "&name=" + name + "&id=" + id, {
    method:"GET",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"},
    });

    return response.json()

  } catch (error){
    console.log(error);
  }
  
}



 export async function addBoard(username, token, board){
  try{
     const response = await fetch(url + boardPath, {
       method:"POST",
       headers: {"Content-Type":"application/json"},
       body: JSON.stringify({username:username, token:token, board:board})
     });

     return response.json()
 
   } catch (error) {
     console.log(error);
 
   }

}





export async function deleteBoard(token, board){
  try {
      const response = await fetch(url + boardPath, {
        method:"DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({token:token, board:board})
      });

      return response.json()
  
    } catch (error) {
      console.log(error);
  
    }
 
}



 ////////////////////////////////////////////////////////
 // LISTS:
 ////////////////////////////////////////////////////////



export async function addList(token, board, list){
  try {
    const response = await fetch(url + listPath, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, list:list})
    });

    return response.json();

  } catch (error) {
  console.log(error);

  }
}

export async function updateList(token, board ,list){
  try{
    const response = await fetch(url + listPath, {
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, list:list})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }



 export async function deleteList(token, board, list){
  try {
    const response = await fetch(url + listPath, {
      method:"DELETE",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, list:list})
    });

    return response.json();

  } catch (error) {
    console.log(error);

  }
}

 ////////////////////////////////////////////////////////
 // CARDS:
 ////////////////////////////////////////////////////////



export async function addCard(token, board ,list, card){
  try{
    const response = await fetch(url + cardPath, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, list:list, card:card})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }


 export async function deleteCard(token, board, listId, card){
  try{
    const response = await fetch(url + cardPath, {
      method:"DELETE",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, listId:listId, card:card})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }



 export async function updateCardName(token, board ,listId, card){
  try{
    const response = await fetch(url + cardPath, {
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, listId:listId, card:card})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }

 export async function updateCardDescription(token, board, listId, card){
  try{
    const response = await fetch(url + cardPath + "/description", {
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, listId:listId, card:card})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }


 export async function addCheckbox(token, board, listId, card, checkbox){
  try{
    const response = await fetch(url + cardPath + "/checkbox", {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, listId:listId, card:card, checkbox:checkbox})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }

 export async function updateCheckbox(token, board, listId, card, checkbox){
  try{
    const response = await fetch(url + cardPath + "/checkbox", {
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, listId:listId, card:card, checkbox:checkbox})
    });
    
    return response.json();

  } catch (error) {
    console.log(error);

  }
   
 }






 ////////////////////////////////////////////////////////
 // USERS:
 ////////////////////////////////////////////////////////


 export async function getAllUsers(){
  try{
   const response = await fetch(url + profilePath + "/users", {
     method:"GET",
     headers: {
       "Content-Type":"application/json",
       "Accept":"application/json"},
     });

     return response.json()

 } catch (error){
   console.log(error);
 }
}


 
export async function addUser(token, board, user){
  try {
    const response = await fetch(url + boardPath + "/user", {
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token:token, board:board, user:user})
    });

    return response.json();

  } catch (error) {
    console.log(error);

  }

}








//////////////////////////////////////////////////////////////
// MESSAGES:
/////////////////////////////////////////////////////////////
export async function getBoardMessages(token, boardName, boardId){
  try {
    console.log(token)
    const response = await fetch(url + messagePath + "?token=" + token + "&name=" + boardName + "&id=" + boardId, {
    method:"GET",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"},
    });

    return response.json()

  } catch (error){
    console.log(error);
  }
  
}



export async function sendBoardMessage(token, board, message){
  try {
    const response = await fetch(url + messagePath, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token, board, message})
    })

    return response.json()
  } catch (error){
    console.log(error);
  }

}




export async function sendLogMessage(token, board, message){
  try {
    const response = await fetch(url + messagePath + "/log", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({token, board, message})
    })

    return response.json()
  } catch (error){
    console.log(error);
  }

}