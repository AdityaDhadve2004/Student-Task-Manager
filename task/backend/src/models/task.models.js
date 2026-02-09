import mongoose, { Schema } from "mongoose";


const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }

},{
    timestamps : true
})
export const Task = mongoose.model("Task",taskSchema)