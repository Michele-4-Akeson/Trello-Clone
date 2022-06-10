const express = require("express");
const router = express.Router();
const Profile = require("../Models/profileModel");





router.get("/profile", async function(req, res){
    try{
        const queryUsername = req.query.username;
        const queryPassword = req.query.password;
        console.log("GET/profile CALLED", queryUsername);
        const result = await Profile.findOne({username:queryUsername, password:queryPassword})
        if (result){
            res.json({success:true});
        } else {
            res.json({sucess:false});
        }
        

    } catch (error){
        console.log(error.message);
    }
    
})



router.post("/", async function(req, res){
    try {
        console.log("POST/Profile CALLED");
        const username = req.body.username;
        const searchResult = await Profile.findOne({username:username});

        if (searchResult == null){
            const insertSuccesful = await Profile.create(requestBody)
            console.log("New profile created\n", insertSuccesful)
            res.json({success:true});
        }

        res.json({success:false});
        
       
    } catch (error){
        console.log(error);
    }


})



router.get("/users", async function(req, res){
    try {
        const result = await Profile.find({}, {password:0, _id:0, boards:0, __v:0});
        console.log("get all users", result)
        res.json(result);
    } catch (error){
        console.log(error)
    }
} )



module.exports = router;