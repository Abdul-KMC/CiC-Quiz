CiC-Quiz: MERN Stack Quizzing Application
Overview
CiC-Quiz is a full-stack quizzing application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application is designed to provide users with a platform to take quizzes on various topics, track their scores, and create/edit their quizzes.

Features

1. User Authentication
   Login Page: Users can securely log in to their accounts to access personalized features.
2. Quizzing Experience
   Topics Page: Browse through various quiz topics available on the platform.
   Taking Quizzes: Users can take quizzes on their selected topics.
   Score Tracking: Track and view quiz scores to monitor performance over time.
3. Quiz Management
   Create Quizzes: Users have the ability to create custom quizzes tailored to their preferences.
   Edit Quizzes: Modify existing quizzes to keep content up-to-date.
4. User Profile
   Profile Page: View and manage user-specific information and preferences.
   Getting Started
   Prerequisites
   Ensure you have Node.js and npm installed on your machine.
   Set up a MongoDB database and obtain a connection URI.
   Installation
   Clone the repository:

bash
Copy code
git clone https://github.com/Abdul-KMC/CiC-Quiz.git
cd cic-quiz
Install dependencies:

bash
Copy code
npm install
Configure the application:

Create a .env file in the root directory with the following variables:
makefile
Copy code
REACT_APP_API_URL=/api # Replace with your API endpoint
REACT_APP_MONGODB_URI=your-mongodb-uri # Replace with your MongoDB connection URI
Start the application:

bash
Copy code
npm start
Open your browser and visit http://localhost:3000 to access CiC-Quiz.

Project Structure
client/: React front-end application.
server/: Node.js and Express back-end server.
config/: Configuration files.
models/: Database models.
routes/: API routes.
controllers/: Logic for handling API requests.
middlewares/: Custom middleware functions.
utils/: Utility functions.
tests/: Unit and integration tests.
Technologies Used
Front-end:
React
React Router
Axios
Back-end:
Node.js
Express.js
MongoDB
Mongoose
