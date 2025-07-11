import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req,res)=>{
  const { firstName, lastName, email, password } = req.body;
 try{
const user = await User.findOne({ email: email });
if(user){
    return res.status(401).json({ error: "User already exists" });
}
// Hash the password before saving
const hashedPassword = await bcrypt.hash(password, 12);
// Create a new user instance with the hashed password              
const newUser = new User({
    firstName,
    lastName,
    email,
    password : hashedPassword
});
 await newUser.save()
return res.status(201).json({ message: "User signup successful" });
 }
 catch(error){
console.log("Error during user signup:", error);
 return res.status(500).json({ error: "Internal server error" });
 }
  // Here you would typically save the user to the database
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({ email: email })
        
        if (!user ) {
            return res.status(403).json({ error: "Invalid credential" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: "Invalid password" });
        }
        //jwt token generation
        const token = jwt.sign({userId: user._id},config.jwtSecret, { expiresIn: "1d" });
        res.cookie("token", token );
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
            expires :new Date(Date.now()+24 * 60 * 60 * 1000)
        };
        res
        return res.status(201).json({ message: "User login successful", user: { firstName: user.firstName, lastName: user.lastName, email: user.email },token });
    } catch (error) {
        console.log("Error during user login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }   
}

export const logout = (req,res)=>{
    try{
     res.clearCookie("token")
     return res.status(200).json({ message: "User logout successful" });
    }
    catch(error){
        console.log("Error during user logout:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}