
const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Board = require("../Models/boardModel")




router.post('/card', async function(req, res){
    /*
    post/Sharedboard attempst to add a board object to the speciifed group in the shared board database 
    */
    try{
        console.log("POST/shared card REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const list = req.body.list
        const card = req.body.card
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$push:{"lists.$[element].cards":card}}, {arrayFilters:[{"element.id": list.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});


router.put('/card', async function(req, res){
    /*
    post/Sharedboard attempst to add a board object to the speciifed group in the shared board database 
    */
    try{
        console.log("PUT/shared card REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card

        console.log(username, board, listId, card)
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$set:{"lists.$[listIndex].cards.$[cardIndex].name":card.name}}, {arrayFilters:[{"listIndex.id": listId}, {"cardIndex.id":card.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});


router.put('/card/description', async function(req, res){
    /*
    post/Sharedboard attempst to add a board object to the speciifed group in the shared board database 
    */
    try{
        console.log("PUT/shared card/description REQUEST CALLED");
        const username = req.body.username;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card

        console.log(username, board, listId, card)
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$set:{"lists.$[listIndex].cards.$[cardIndex].description":card.description}}, {arrayFilters:[{"listIndex.id": listId}, {"cardIndex.id":card.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});




router.delete('/card', async function(req, res){
    /*
    post/Sharedboard attempst to add a board object to the speciifed group in the shared board database 
    */
    try{
        console.log("DELETE/ shared card REQUEST CALLED");
        const requestBody = req.body
        const username = req.body.username;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card
        const updateResult = await Board.updateOne({members:{$in:[username]}, name:board.name, id:board.id}, {$pull:{"lists.$[element].cards":card}}, {arrayFilters:[{"element.id": list.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
});






module.exports = router