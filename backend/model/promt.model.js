import e from "express";
import mongoose, { mongo } from "mongoose";
 
const promtSchema = new mongoose.Schema({
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: [true, "User ID is required"]
    },
   role:{
    type: String,
    enum: ["user", "assistant"],
    required: [true, "Role is required"]
   },
   content:{
    type: String,
    required: true
   },
   createdAt: {
    type: Date,
    default: Date.now
   }
   
})
export const Promt = mongoose.model("Promt", promtSchema);