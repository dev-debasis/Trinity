import express from "express";
import { generatePdfWithQr } from "../controllers/pdfGenerator.controller.js";

const router = express.Router();

router.post("/", generatePdfWithQr);

export default router;
