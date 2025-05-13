// controllers/questionController.js
import Question from '../models/Question.js';

export const getQuestions = async (req, res) => {
  console.log('Fetching questions');
  try {  
    const { category,  page } = req.params;
    const limit = 10;
    const filter = {};
    if (category) filter.category = category;
    // if (difficulty) filter.difficulty = difficulty;

    const skip = (page - 1) * limit;

    // Count total for metadata
    const total = await Question.countDocuments(filter);

    // Fetch questions (lean and select only needed fields)
    const questions = await Question.find(filter)
      // .select('question options _id') // remove unnecessary fields for speed
      .skip(skip)
      .limit(10)
      .lean();
    console.log(questions);
    res.status(200).json({
      questions
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// controllers/questionController.js

export const insertQuestion = async (req, res) => {
    const { question, options, answerIndex, category, difficulty } = req.body;
  
    if (!question || !options || answerIndex === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const newQuestion = new Question({
        question,
        options,
        answerIndex,
        category,
        difficulty,
      });
  
      const saved = await newQuestion.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  // controllers/questionController.js

export const bulkInsertQuestions = async (req, res) => {
    const questions = req.body;
  
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Input must be a non-empty array of questions' });
    }
  
    try {
      const inserted = await Question.insertMany(questions);
      res.status(201).json({ message: `${inserted.length} questions inserted successfully` });
    } catch (err) {
      res.status(500).json({ message: 'Bulk insert failed', error: err.message });
    }
  };

  export const getStart = async (req, res) => {
    console.log('Fetching start questions');
    try {
        const questions = await Question.find().limit(10);
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

