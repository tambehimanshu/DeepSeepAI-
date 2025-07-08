import e from "express";
import mongoose, { mongo } from "mongoose";
 
const userSchema = new mongoose.Schema({
   
    firstName: {
        type: String,
        required: [true, "firstname is required"],
    
    }, 
     lastName: {
        type: String,
        required: [true, "Lastname is required"],
    },
      email: {
        type: String,   
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,   
        required: [true, "Password is required"],
    }

})
export const User = mongoose.model("User", userSchema);