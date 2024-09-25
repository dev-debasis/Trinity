import Router from 'express';
const router = Router();
import { captureScreenshot } from "../controllers/screenshot.controller.js"

router.post('/capture', captureScreenshot);

module.exports = router;