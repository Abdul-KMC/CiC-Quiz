import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../style/Dashboard.css';
import userImage from '../images/user.png';
import profileImage from '../images/profile.png';
import quizImage from '../images/Quiz.png';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Header />
      <div className="mainPage">
        <section className="sidebar">
          <img src={userImage} alt="User" className="userImage" />
          <h5 className="username">username</h5>
          <nav className="nav">
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/topics')}>Topics</button>
          </nav>
        </section>
        <section className="dashboard-content">
          <button className="dashboard-button" onClick={() => navigate('/profile')}>
            <img src={profileImage} alt="User Profile" />
          </button>
          <button className="dashboard-button" onClick={() => navigate('/topics')}>
            <img src={quizImage} alt="Topics" />
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;