const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)
const User = require('../models/user.js')
const Quiz = require('../models/model.js')
const Question = require('../models/questionModel.js')

const testUsers = [{
        userName: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        quizzes: [],
    },
    {
        userName: 'user2',
        email: 'user2@example.com',
        password: 'password2',
        quizzes: [],
    }
]

const testQuizzes = [{
        name: 'Quiz 1',
        questions: [],
        highest_score: 0,
    },
    {
        name: 'Quiz 2',
        questions: [],
        highest_score: 0,
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
        correct_answer: 'Option 2',
        points: 10,
    }
];

describe('Quiz API endpoints', () => {
    beforeAll(async() => {
        await mongoose.connect('mongodb+srv://cicQuiz:GL6HK6g4vkwKQi1L@codingincolor.asbxdfd.mongodb.net/TestQuiz?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })
})

beforeEach(async() => {
    for (const testUser of testUsers) {
        const newUser = new User({
            username: testUser.userName,
            email: testUser.email,
            password: testUser.password,
        })
        await newUser.save()
    }

    for (const testQuiz of testQuizzes) {
        const newQuiz = new Quiz({
            name: testQuiz.name,
            questions: testQuiz.questions,
            highest_score: testQuiz.highest_score,
        })
        await newQuiz.save()
    }

    for (const testQuestion of testQuestions) {
        const newQuestion = new Question({
            question: testQuestion.question,
            options: testQuestion.options,
            correct_answer: testQuestion.correct_answer,
            points: testQuestion.points,
        })
        await newQuestion.save()
    }
})

afterEach(async() => {
    await User.deleteMany()
    await Quiz.deleteMany()
    await Question.deleteMany()
})

afterAll(async() => {
    await User.deleteMany()
    await Quiz.deleteMany()
    await Question.deleteMany()
    await mongoose.connection.close()
})

// describe('Test case to handle timeout issue', () => {
//     test('dummy test case to prevent timeout', () => {
//         expect(true).toBe(true);
//     }, 1000);
// });

describe('GET /api/user/getUser/:userId', () => {
    test('should return a user by ID', async() => {
        const users = await User.find();
        const userId = users[0]._id;

        const response = await request.get(`/api/user/getUser/${userId}`);
        expect(response.status).toBe(200);
    });
});

describe('GET /api/quizzes', () => {
    test('should return all quizzes', async() => {
        const response = await request.get('/api/quizzes');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe('GET /api/quiz/:id', () => {
    test('should return a quiz by ID', async() => {
        const quizzes = await Quiz.find();
        const quizId = quizzes[0]._id;

        const response = await request.get(`/api/quiz/${quizId}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Quiz 1');
    });
});

describe('GET /api/questions', () => {
    test('should return all questions', async() => {
        const response = await request.get('/api/questions');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/questions/:questionId', () => {
    test('should return a question by ID', async() => {
        const questions = await Question.find();
        const questionId = questions[0]._id;

        const response = await request.get(`/api/questions/${questionId}`);
        expect(response.status).toBe(200);
    });
});