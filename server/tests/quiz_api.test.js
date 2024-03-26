const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const { connectToTestDatabase, disconnectFromTestDatabase, initializeTestData, clearTestData } = require('./test_helper');

beforeAll(async() => {
    await connectToTestDatabase();
    await initializeTestData();
});

describe('GET /api/user/:userId', () => {
    test('should return a user by ID', async() => {
        const users = await User.find();
        const userId = users[0]._id;

        const response = await request.get(`/api/user/${userId}`);
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

afterAll(async() => {
    await clearTestData();
    await disconnectFromTestDatabase();
});