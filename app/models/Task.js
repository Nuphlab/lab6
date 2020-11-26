/*

This file is for creating a Mongoose Model/Schema

*/

const mongoose = require("mongoose")
const { Schema } = mongoose

let taskSchema = new Schema({
    UserId: String,
    Text: String,
    Done: Boolean,
    Date: String,
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task