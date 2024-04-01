// const mongoose = require('mongoose');

// let connection;
// let db;

// const connectToTestDatabase = async() => {
//     if (!connection) {
//         const uri = process.env.TEST_DATABASE_URL;
//         connection = await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         db = connection.connection.db;
//     }
// };

// const disconnectTestDatabase = async() => {
//     if (connection) {
//         await mongoose.disconnect();
//         connection = null;
//     }
// };

// const initializeTestData = async() => {
//     await connectToTestDatabase();

//     const users = db.collection('users');
//     const quizzes = db.collection('quizzes');
//     const questions = db.collection('questions');

// const user1 = {
//     userName: 'user1',
//     email: 'user1@example.com',
//     password: 'password1',
// };
// const user2 = {
//     userName: 'user2',
//     email: 'user2@example.com',
//     password: 'password2',
// }
// await users.insertOne(user1);
// await users.insertOne(user2);

// const quiz1 = {
//     name: 'Quiz 1',
//     questions: [],
//     highest_score: 0,
// };
// const quiz2 = {
//     name: 'Quiz 2',
//     questions: [],
//     highest_score: 0,
// };
// await quizzes.insertOne(quiz1);
// await quizzes.insertOne(quiz2);

// const question1 = {
//     question: 'Question 1',
//     options: ['Option 1', 'Option 2', 'Option 3'],
//     correct_answer: 'Option 1',
//     points: 10,
// };
// const question2 = {
//     question: 'Question 2',
//     options: ['Option 1', 'Option 2', 'Option 3'],
//     correct_answer: 'Option 1',
//     points: 10,
// };
//     await questions.insertOne(question1);
//     await questions.insertOne(question2);
// };

// const clearTestData = async() => {
//     await connectToTestDatabase();

//     const users = db.collection('users');
//     const quizzes = db.collection('quizzes');
//     const questions = db.collection('questions');

//     await users.deleteMany();
//     await quizzes.deleteMany();
//     await questions.deleteMany();
// };

// module.exports = {
//     connectToTestDatabase,
//     disconnectTestDatabase,
//     initializeTestData,
//     clearTestData,
// };

const testUsers = [{
        userName: 'user1',
        email: 'user1@example.com',
        password: 'password1',
    },
    {
        userName: 'user2',
        email: 'user2@example.com',
        password: 'password2',
    }
]

const testQuizzes = [{
        name: 'Quiz 1',
        questions: [],
        highest_score: 0,
    },
    {
        question: 'Question 2',
        options: ['Option 1', 'Option 2', 'Option 3'],
        correct_answer: 'Option 1',
        points: 10,
    }
];

const testQuestions = [{
        question: 'Question 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
        correct_answer: 'Option 1',
        points: 10,
    },
    {
        question: 'Question 2',
        options: ['Option 1', 'Option 2', 'Option 3'],
        correct_answer: 'Option 1',
        points: 10,
    }
];

// module.exports = {
//     testUsers,
//     testQuizzes,
//     testQuestions
// }