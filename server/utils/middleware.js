const morgan = require('morgan');
const customFormat = ':method :url :status :res[content-length] - :response-time ms';
const morganMiddleware = morgan(customFormat);

// Define a middleware for handling unknown endpoints
const unknownHandler = (request, response, next) => {
    response.status(404).json({ error: 'Unknown endpoint' });
};

module.exports = {
    morganMiddleware,
    unknownHandler
};