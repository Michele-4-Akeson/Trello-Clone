const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Board = require("../Models/boardModel")






router.post('/list', async function(req, res){
    /*
    post/list attempst to add a list object to the speciifed group in the shared board database 
    */
    try{
        console.log("POST/List REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const list = req.body.list
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$push:{lists:list}})

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});

router.delete("/list", async function(req, res){
    try{
        console.log("DELETE/List REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const list = req.body.list
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$pull:{lists:list}})

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
    

})



router.put('/list', async function(req, res){
    /*
    post/list attempst to add a board object to the speciifed group in the shared board database 
    */
    try{
        console.log("PUT/List REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const list = req.body.list
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id, }, { $set: { "lists.$[element]" : list} }, {arrayFilters:[{"element.id": list.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});

module.exports = router