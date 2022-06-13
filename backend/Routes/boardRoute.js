const express = require("express");
const router = express.Router();
const Profile = require("../Models/profileModel")
const Board = require("../Models/boardModel")


router.get("/", async function(req, res){
    /*
    gets all boards in which username is a member
    */
    try {
        const token = req.query.token;
        const name = req.query.name;
        const id = req.query.id;
        console.log("GET/Board CALLED", token, name, id);
        const result = await Board.findOne({members: {$in:[token]}, name:name, id:id}, {members:0, _id:0});
        console.log(result)
        res.json(result)
       
    } catch (error){
        console.log(error);
    }
})




router.get("/all", async function(req, res){
    /*
    gets all boards in which username is a member
    */
    try {
        const token = req.query.token;
        console.log("GET/BoardS CALLED");
        const result = await Board.find({members: token}, {members:0, _id:0});
        res.json({boards:result})
       
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
        const token = req.body.token
        const username = req.body.username;
        const board = req.body.board;
        const updateResult = await Board.create({members:[token], users:[username], name:board.name, id:board.id, image:board.image, lists:[]})
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
        const token = req.body.token
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
        const token = req.body.token;
        const board = req.body.board;
        const user = req.body.user

        const userData = await Profile.findOne({username:user})
        console.log(token, board, user)
        if (userData){
            const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$push:{members: userData.token, users:user}})
            console.log(updateResult)
            res.json({success:updateResult.modifiedCount == 1});
        }
      

      
        

    } catch (error){
        console.log(error);
    }
    
});





module.exports = router