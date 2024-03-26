require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;
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

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors());

app.use(express.json());
app.use(middleware.morganMiddleware);
app.get('/', (req, res) => {
    res.send("hello")
})
app.use('/api', routes);
app.use('/api/questions', questionRoutes);
app.use('/api/user', userRoute);
app.use('/api', decodeToken);

// Unknown endpoint
app.use(middleware.unknownHandler)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})