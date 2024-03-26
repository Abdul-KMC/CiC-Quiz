const mongoose = require('mongoose');

const connectToTestDatabase = async() => {
    const uri = process.env.TEST_DATABASE_URL;
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};

// Disconnect from the test database
const disconnectTestDatabase = async() => {
    await mongoose.disconnect();
};

// Initialize test data
const initializeTestData = async() => {
    // Define initial test data
    const usersData = [{
            userName: 'user1',
            email: 'user1@example.com',
            password: 'password1',
        },
        {
            userName: 'user2',
            email: 'user2@example.com',
            password: 'password2',
        },
    ];

    const quizzesData = [{
            name: 'Quiz 1',
            questions: [],
            highest_score: 0,
        },
        {
            name: 'Quiz 2',
            questions: [],
            highest_score: 0,
        },
    ];

    const questionsData = [{
            question: 'Question 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_answer: 'Option 1',
            points: 10,
        },
        {
            question: 'Question 2',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_answer: 'Option 2',
            points: 10,
        },
    ];

    // Create test data in the database
    await User.create(usersData);
    await Quiz.create(quizzesData);
    await Question.create(questionsData);
};

// Clear test data
const clearTestData = async() => {
    await User.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();
};

module.exports = {
    connectToTestDatabase,
    disconnectTestDatabase,
    initializeTestData,
    clearTestData,
};