const mongoose = require("mongoose");



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
    lists:[listSchema]


})



module.exports = mongoose.model("Boards", boardSchema, "Boards");