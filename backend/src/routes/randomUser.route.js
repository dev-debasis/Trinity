import express from "express";
import { generateUserData } from "../controllers/randomUser.controller.js";

const router = express.Router();

router.post("/", generateUserData); 

export default router;
