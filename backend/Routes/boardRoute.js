const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Profile = require("../Models/profileModel")
const Board = require("../Models/boardModel")




router.get("/", async function(req, res){
    /*
    gets all boards in which username is a member
    */
    try {
        const username = req.query.username;
        console.log("GET/Board CALLED");
        const result = await Board.find({members: username}, {members:0, _id:0});
        res.json(result)
       
    } catch (error){
        console.log(error);
    }
})




router.post('/', async function(req, res){
    /*
    creates a board
    */
    try{
        console.log("POST/Board REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const updateResult = await Board.create({members:[username], name:board.name, id:board.id, image:board.image, lists:[]})
        res.json({success:updateResult});
        

    } catch (error){
        console.log(error);
    }
    
});





router.delete('/', async function(req, res){
    /*
    deletes a board 
    */
    try{
        console.log("DELETE/Board REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const updateResult = await Board.deleteOne({members: {$in:[token]}, name:board.name, id:board.id})
        res.json({success:updateResult});
        
    } catch (error){
        console.log(error);
    }
    
});


router.put('/user', async function(req, res){
    /*
    adds user to a board
    */
    try{
        console.log("PUT/user REQUEST CALLED");
        const username = req.body.token;
        const board = requestBody.board;
        const user = requestBody.user
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$push:{members:user}})

        //console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});






module.exports = router