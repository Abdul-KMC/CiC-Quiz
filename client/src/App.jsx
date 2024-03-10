import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile';
import Topics from './components/Topics';
import Quiz from './components/Quiz';
import Modify from './components/Modify';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/modify" element={<Modify />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
