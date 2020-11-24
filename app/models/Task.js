/*

This file is for creating a Mongoose Model/Schema

*/

import mongoose from 'mongoose'
const { Schema } = mongoose

let taskSchema = new Schema({
    UserId: String,
    Text: String,
    Done: Boolean,
    Date: String,
})

const Task = mongoose.model('Tasks', taskSchema)
module.exports = Task