import jwt from 'jsonwebtoken';
import config from '../../config.js';

function  usermiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    try {  
        const decoded = jwt.verify(token, config.jwtSecret)
        console.log(decoded)
        decoded.userId = decoded.userId || decoded._id; // Ensure userId is set
        req.userId = decoded.userId; // Attach userId to request object

        next();
    } 
    catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
export default usermiddleware;