import Router from "express";
import { generateRandomUsers } from '../controllers/randomUser.controller';

const router = Router();

// POST route to generate a PDF with QR code from input data
router.post('/generate-pdf', generatePDFWithQRCode);

module.exports = router;
