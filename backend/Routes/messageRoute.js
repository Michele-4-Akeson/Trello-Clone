const express = require("express");
const router = express.Router();
const Profile = require("../Models/profileModel")
const Board = require("../Models/boardModel")


router.get("/", async function(req, res){
    /*
    gets all messages for a board is a member
    */
    try {
        const token = req.query.token;
        const name = req.query.name;
        const id = req.query.id;
        console.log("GET/messages CALLED", token, name, id);
        const result = await Board.findOne({members: {$in:[token]}, name:name, id:id}, {members:0, _id:0, lists:0, image:0});
        console.log(result)
        res.json(result)
       
    } catch (error){
        console.log(error);
    }
})



router.post("/", async function(req, res){
    try{
        console.log("POST/message REQUEST CALLED");
        const token = req.body.token
        const board = req.body.board
        const message = req.body.message

        console.log(token, board, message)
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$push:{messages:message}})
        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        
      

      
        

    } catch (error){
        console.log(error);
    }
    
})



module.exports = router