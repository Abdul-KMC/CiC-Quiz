const express = require('express');
const Question = require('../models/questionModel');
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
        await newQuestion.save();
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
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).send();
        }
        res.send(question);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;