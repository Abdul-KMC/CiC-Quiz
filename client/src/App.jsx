import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile';
import Topics from './components/Topics';
import Quiz from './components/Quiz';
import Modify from './components/Modify';
import setQuizDataToLocalStorage from '../data/localStorage';

const App = () => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    setQuizDataToLocalStorage();
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('quizData')) || [];
    setQuizData(dataFromLocalStorage);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/topics" element={<Topics quizData={quizData} />} />
          <Route path="/quiz/:id" element={<Quiz quizData={quizData} />} />
          <Route path="/modify/:id" element={<Modify quizData={quizData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
