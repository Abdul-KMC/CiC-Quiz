const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: [questionSchema],
    highest_score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Quiz', quizSchema);