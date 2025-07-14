import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import userRoutes from './routes/user.route.js';
import promtRoutes from './routes/promt.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
const app = express();
const port = process.env.PORT || 3321;
 const MONGO_URL = process.env.MONGO_URL 
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
       origin: 'http://localhost:5173',// Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');    
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
}); 


// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/deepseekai", promtRoutes);
app.listen(port,()=>{
    console.log(`app is listing on port ${port}`);
})

// one problem is that when chance in the user the histury remains same not changing check in promt.jsx