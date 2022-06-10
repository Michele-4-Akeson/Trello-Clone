const mongoose = require("mongoose");


const checkListSchema = new mongoose.Schema({
    text: String,
    id: String,
    checked: Boolean
})

const cardSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,
    checkList:[checkListSchema]

})

const listSchema = new mongoose.Schema({
    name:String,
    id:String,
    cards:[cardSchema]
})


const boardSchema = new mongoose.Schema({
    members:[String],
    name:String,
    id:String,
    image: String,
    lists:[listSchema]


})



module.exports = mongoose.model("Boards", boardSchema, "Boards");