import express from 'express';
import { sendPromt } from '../controller/promt.controller.js';
import usermiddleware from '../middleware/promt.middleware.js';
const router = express.Router();

router.post("/promt",usermiddleware,sendPromt);


export default router;