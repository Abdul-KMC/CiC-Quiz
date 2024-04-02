require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
const routes = require('./routers/routes');
const questionRoutes = require('./routers/questionRoutes');
const userRoute = require('./routers/userRoute');
const decodeToken = require('./routers/decodeToken')
const middleware = require('./utils/middleware')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', async() => {
    await console.log('Database Connected');
})
const app = express();
app.use(cors());

app.use(express.json());
app.use(middleware.morganMiddleware);
app.use('/api', routes);
app.use('/api/questions', questionRoutes);
app.use('/api/user', userRoute);
app.use('/api', decodeToken);

// Unknown endpoint
app.use(middleware.unknownHandler)

const server = app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

module.exports = server;