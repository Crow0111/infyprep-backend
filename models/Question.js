// models/Question.js
import mongoose  from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answerIndex: { type: Number, required: true },
  category: String,
  difficulty: String,
});
questionSchema.index({ category: 1, difficulty: 1 });
export default  mongoose.model('Question', questionSchema);
// models/Question.js