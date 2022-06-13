const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    date: String,
    text: String,
    user: String
})

const cardSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,

})

const listSchema = new mongoose.Schema({
    name:String,
    id:String,
    cards:[cardSchema]
})


const boardSchema = new mongoose.Schema({
    members:[String],
    users:[String],
    name:String,
    id:String,
    image: String,
    lists:[listSchema],
    messages:[messageSchema]


})



module.exports = mongoose.model("Boards", boardSchema, "Boards");