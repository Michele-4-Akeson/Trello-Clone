const express = require("express");
const router = express.Router();
const Board = require("../Models/boardModel")




router.post('/', async function(req, res){
    try{
        console.log("POST/card REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const list = req.body.list
        const card = req.body.card
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$push:{"lists.$[element].cards":card}}, {arrayFilters:[{"element.id": list.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
})


router.put('/', async function(req, res){
    try{
        console.log("PUT/scard REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card

        console.log(token, board, listId, card)
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$set:{"lists.$[listIndex].cards.$[cardIndex].name":card.name}}, {arrayFilters:[{"listIndex.id": listId}, {"cardIndex.id":card.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
})

router.put('/description', async function(req, res){
    try{
        console.log("PUT/shared card/description REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card

        console.log(token, board, listId, card)
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$set:{"lists.$[listIndex].cards.$[cardIndex].description":card.description}}, {arrayFilters:[{"listIndex.id": listId}, {"cardIndex.id":card.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
})



router.delete('/', async function(req, res){
    try{
        console.log("DELETE/card REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$pull:{"lists.$[element].cards":card}}, {arrayFilters:[{"element.id": listId}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
})



router.post('/checkbox', async function(req, res){
    try{
        console.log("POST/card/checkbox REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card
        const checkbox = req.body.checkbox

        console.log(token, board, listId, card, checkbox)
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$push:{"lists.$[listIndex].cards.$[cardIndex].checklist":checkbox}}, {arrayFilters:[{"listIndex.id": listId}, {"cardIndex.id":card.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
})


router.put('/checkbox', async function(req, res){
    try{
        console.log("PUTT/card/checkbox REQUEST CALLED");
        const token = req.body.token;
        const board = req.body.board;
        const listId = req.body.listId
        const card = req.body.card
        const checkbox = req.body.checkbox

        console.log(token, board, listId, card, checkbox)
        const updateResult = await Board.updateOne({members:{$in:[token]}, name:board.name, id:board.id}, {$set:{"lists.$[listIndex].cards.$[cardIndex].checklist.$[checkboxIndex].checked":checkbox.checked}}, {arrayFilters:[{"listIndex.id": listId}, {"cardIndex.id":card.id}, {"checkboxIndex.id":checkbox.id}]});

        console.log(updateResult)
        res.json({success:updateResult.modifiedCount == 1});
        

    } catch (error){
        console.log(error);
    }
    
})





module.exports = router