import Router from "express";
import { generateRandomUsers } from '../controllers/randomUser.controller';

const router = Router();

// POST route to generate random user data and save it in CSV
router.post('/generate-data', generateRandomUsers);

module.exports = router;