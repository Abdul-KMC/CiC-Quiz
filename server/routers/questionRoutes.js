const express = require('express');
const Question = require('../models/questionModel');
const Quiz = require('../models/model');
const router = express.Router();

// POST route to create a new question
router.post('/:id', async(req, res) => {
    try {
        const quizId = req.params.id
        const { question, options, correct_answer, points } = req.body;
        if (!question || !options || !correct_answer || !points) {
            return response.status(400).send({
                error: 'missing content in body'
            })
        }
        const quiz = await Quiz.findById(quizId)
        if (!quiz) {
            return response.status(400).send({
                error: 'no such quiz exists to add the question to'
            })
        }

        // Create a new question instance
        const newQuestion = new Question({
            question,
            options,
            correct_answer,
            points
        });

        // Save the new question to the database
        const ques = await newQuestion.save();
        quiz.questions = quiz.questions.concat(ques._id)
        await quiz.save();
        res.status(201).send(newQuestion);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all questions
router.get('/', async(req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get question by ID
router.get('/:id', async(req, res) => {
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
router.patch('/:id', async(req, res) => {
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
router.delete('/:id', async(req, res) => {
    try {
        const { quizId } = req.body
            // Check if the quiz exists
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
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;