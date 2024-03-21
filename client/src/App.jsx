import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuizData } from './reducers/quizReducer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Topics from './components/Topics';
import Quiz from './components/Quiz';
import Modify from './components/Modify';
import SignUp from './components/SignUp';
import setQuizDataToLocalStorage from '../data/localStorage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setQuizDataToLocalStorage();
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('quizData')) || [];
    dispatch(setQuizData(dataFromLocalStorage));
  }, [dispatch]);

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
