// routes/questionRoutes.js
import express from 'express';
const router = express.Router();
import { bulkInsertQuestions, getQuestions, getStart, insertQuestion } from '../controllers/questionController.js';

router.get("/:category/page/:page", getQuestions);
router.get('/start', getStart);
router.post('/add', insertQuestion);
router.post('/bulk', bulkInsertQuestions);

export default router;
