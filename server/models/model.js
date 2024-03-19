const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    questions: {
        required: true,
        type: Array
    },
    highest_score: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('quiz', dataSchema)