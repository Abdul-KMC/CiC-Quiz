const express = require('express');
const Quiz = require('../models/model');
const Questions = require('../models/questionModel');
const User = require('../models/user')
const router = express.Router();

// Post Method - Create a new quiz
router.post('/quiz/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const quiz = new Quiz(req.body);
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({
                error: 'no such user exists to add quiz'
            })
        }
        await quiz.save();
        user.quizzes = user.quizzes.concat(quiz._id)
        await user.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all quizzes
router.get('/quizzes', async(req, res) => {
    try {
        const quizzes = await Quiz.find().populate("questions");
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
        const { userId } = req.body
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({
                error: 'no such user exists to remove the quiz from'
            })
        }
        // Removing questions that belongs to that quiz
        const questionsIds = (await Quiz.findById(req.params.id)).questions.map(id => id.toJSON())
        await Promise.all(questionsIds.map(id => Questions.findByIdAndDelete(id)))
            // Removing Quiz
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        // Update the user
        user.quizzes = user.quizzes.filter(id => id.toJSON() !== req.params.id)
        await user.save()

        res.status(204);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;