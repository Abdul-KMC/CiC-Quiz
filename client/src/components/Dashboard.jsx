import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styling/Dashboard.css';
import userImage from '../images/user.png';
import profileImage from '../images/profile.png';
import quizImage from '../images/Quiz.png';

function Dashboard() {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate('/profile');
  };
  const handleClickTopics = () => {
    navigate('/topics');
  };
  return (
    <div className="dashboard">
      <Header />
      <div className="mainPage">
        <section className="sidebar">
          <img src={userImage} alt="User" className="userImage" />
          <h5 className="username">username</h5>
          <nav className="nav">
            <a href="Dashboard.jsx">Dashboard</a>
            <a href="Topics.jsx">Topics</a>
          </nav>
        </section>
        <section className="dashboard-content">
          <button className="dashboard-button" onClick={() => handleClickProfile()}>
            <img src={profileImage} alt="User Profile" />
          </button>
          <button className="dashboard-button" onClick={() => handleClickTopics()}>
            <img src={quizImage} alt="Topics" />
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;