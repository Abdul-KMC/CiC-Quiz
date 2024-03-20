const express = require('express');
const Quiz = require('../models/model');
const router = express.Router();

// Post Method - Create a new quiz
router.post('/quiz', async(req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all quizzes
router.get('/quizzes', async(req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get quiz by ID
router.get('/quiz/:id', async(req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        res.send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update quiz by ID
router.patch('/quiz/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'highest_score']; // Add 'questions' if you want to update questions as well
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) {
            return res.status(404).send();
        }
        res.send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete quiz by ID
router.delete('/quiz/:id', async(req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        res.send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;