import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuizData, setUserId } from './reducers/quizReducer';
import baseurl from './api';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Topics from './components/Topics';
import Quiz from './components/Quiz';
import Modify from './components/Modify';
import SignUp from './components/SignUp';

const App = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
          // const token = useSelector(state => state.quiz.jwtToken);
            const token = localStorage.getItem('jwtToken');
            if (token) {
                // Decode token to get user data
                const decodedResponse = await axios.post(`${baseurl}/api/decode`, { token });
                const userId = decodedResponse.data._id;
                dispatch(setUserId(userId));

                // Fetch user's quizzes
                const userResponse = await axios.get(`${baseurl}/api/user/getUser/${userId}`);
                const quizzesIds = userResponse.data.quizzes;

                const quizzesData = [];
                for (const quizId of quizzesIds) {
                    const quizResponse = await axios.get(`${baseurl}/api/quiz/${quizId}`);
                    const quiz = quizResponse.data;

                    const questionsData = [];
                    for (const questionId of quiz.questions) {
                        const questionResponse = await axios.get(`${baseurl}/api/questions/${questionId}`);
                        questionsData.push(questionResponse.data);
                    }

                    quiz.questions = questionsData;
                    quizzesData.push(quiz);
                }

                dispatch(setQuizData(quizzesData));
                localStorage.setItem('quizData', quizzesData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setFetchingData(false);
        }
    };

    fetchData();
}, [dispatch]);

if (fetchingData) {
    return <div>Fetching Data...</div>;
}

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/modify/:id" element={<Modify />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
