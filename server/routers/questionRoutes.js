const express = require('express');
const Question = require('../models/questionModel');
const Quiz = require('../models/model');
const router = express.Router();

// POST route to create a new question
router.post('/questions', async(req, res) => {
    try {
        const { question, options, correct_answer, points, quiz_id } = req.body;

        // Create a new question instance
        const newQuestion = new Question({
            question,
            options,
            correct_answer,
            points,
            quiz: quiz_id // Assign quiz_id to the quiz field
        });

        // Save the new question to the database
        const ques = await newQuestion.save();
        const quiz = await Quiz.findOneAndUpdate(newQuestion.quiz, { $push: { questions: ques._id } });
        res.status(201).send(newQuestion);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all questions
router.get('/questions', async(req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get question by ID
router.get('/question/:id', async(req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send();
        }
        res.send(question);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update question by ID
router.patch('/question/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['question', 'options', 'correct_answer', 'points'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!question) {
            return res.status(404).send();
        }
        res.send(question);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete question by ID
router.delete('/question/:id', async(req, res) => {
    try {
        const { quizId } = req.body
            // Check if the basket exists
        const quiz = await Quiz.findById(quizId)
        if (!quiz) {
            return response.status(400).send({
                error: 'no such quiz exists to remove the question from'
            })
        }
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).send();
        }
        quiz.questions = quiz.questions.filter(id => id.toJSON() !== req.params.id)
        await quiz.save()
        res.status(204);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;