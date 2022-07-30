const mongoose = require("mongoose");




const messageSchema = new mongoose.Schema({
    date: String,
    compare:String,
    text: String,
    user: String
})


const checkboxSchema = new mongoose.Schema({
    label: String,
    id: String,
    checked: Boolean
})

const cardSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,
    checklist:[checkboxSchema]

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
    messages:[messageSchema],
    log:[messageSchema]


})



module.exports = mongoose.model("Boards", boardSchema, "Boards");