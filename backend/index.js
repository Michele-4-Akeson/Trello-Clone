/*
SERVER INITILIZATION:
*/

const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const bodyParser = require('body-parser');  
const querystring = require('querystring'); 
const mongoose = require("mongoose");
require("dotenv/config"); // gives access to all values stored in .env file - used to store sensitive info that we don't want to display in public repo - use via: process.env.<name of value>


const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log("Server started and listing on Port: " + PORT)
});

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }

 app.use(cors(corsOptions));
 app.use(express.json());
 app.use(bodyParser.json())




/*
Database Connection
*/

mongoose.connect(process.env.MONGO_DB_CONNECTION, ()=>{
    console.log("Connected to mongoDB");
})




/*
EXPRESS ROUTERS
*/
const profileRoute = require("./Routes/profileRoute"); 
const boardRoute = require("./Routes/boardRoute");
const listRoute = require("./Routes/listRoute");
const cardRoute = require("./Routes/cardRoute");
const messageRoute = require("./Routes/messageRoute");


app.use("/profile", profileRoute);
app.use("/board", boardRoute);
app.use("/list", listRoute);
app.use("/card", cardRoute);
app.use("/message", messageRoute)




/*
WEBSOCKET
*/

const io = new Server(httpServer, {
    cors:corsOptions
});

let onlineUsers = []

io.on('connection', (socket) => {
    console.log('a user connected: ', socket.id);

    socket.on("logged-on", (username, token)=>{
      const user = {username:username, token:token, id:socket.id};
      console.log("user online: ", username, socket.id)
      onlineUsers.push(user);

      console.log(onlineUsers)

    })

    socket.on("log-out", ()=>{
        console.log("user disconnected", socket.id)
        onlineUsers = onlineUsers.filter(user=>user.id != socket.id)
        //console.log(onlineUsers)
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
        onlineUsers = onlineUsers.filter(user=>user.id != socket.id)
        console.log(onlineUsers)

    })

    socket.on("join-all", (boards)=>{
        for (let board of boards){
            if (!socket.rooms.has(board.id)){
                console.log(socket.id, "joined room:", board.id)
                socket.join(board.id);
            }
            
        }
    })

    socket.on("join-room", (room)=>{
       
        if (!socket.rooms.has(room)){
            console.log(socket.id, "joined room:", room)
            socket.join(room);

        }
        
    });

    socket.on("add-user", (username, roomId)=>{
        for (let user of onlineUsers){
            if (user.username == username){
              console.log(user, "added to ", roomId);
              socket.to(user.id).emit("added-to-room", username, user.password, roomId)
              break;
            }
          }

    })

    socket.on("delete-board", (board)=>{
        console.log(board, "deleted")
        socket.to(board.id).emit("delete-board", board)
    })


    socket.on("update-list", (room, list)=>{
        socket.to(room).emit("update-list", room, list)
    })

    socket.on("add-list", (roomId, list)=>{
        console.log("list added", list)
        socket.to(roomId).emit("add-list", roomId, list)
    })

    socket.on("delete-list", (list, roomId)=>{
        console.log("list deleted", list)
        socket.to(roomId).emit("delete-list", list, roomId)
    })


 


    socket.on("add-card", (list, cards, roomId, card)=>{
        console.log("add card", cards, + " with ", card)
        socket.to(roomId).emit("add-card", list, cards, card)
    })


   


    socket.on("delete-card", (listId, cards, card, roomId)=>{
        console.log("delete card", cards)
        socket.to(roomId).emit("delete-card", listId, cards, card)
    })


    socket.on("change-card-name", (card, roomId)=>{
        console.log("card changed", card, roomId)
        socket.to(roomId).emit("change-card-name", card, roomId)

    })

    socket.on("change-card-description", (card, roomId)=>{
        console.log("card changed", card, roomId)
        socket.to(roomId).emit("change-card-description", card, roomId)

    })


    socket.on("send-message", (messages, message, roomId)=>{
        socket.to(roomId).emit("message-sent", messages, message, roomId)
    })


    socket.on("send-log", (log, logItem, roomId)=>{
        socket.to(roomId).emit("log-sent", log, logItem, roomId)
    })



    socket.on("add-checkbox", (card, roomId, checklist, checkbox)=>{
        socket.to(roomId).emit("add-checkbox", card, roomId, checklist, checkbox)
    })

    socket.on("check", (cardId, roomId, checkbox)=>{
        socket.to(roomId).emit("check", cardId, roomId, checkbox)

    })



});

