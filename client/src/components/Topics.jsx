import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styling/Dashboard.css';
import userImage from '../images/user.png';

function Topics({ quizData }) {
  const navigate = useNavigate();

  const handleClickModify = (id) => {
    navigate(`/modify/${id}`);
  };

  const handleClickDelete = (id) => {
    // Add your delete logic here
  };

  const handleClickTopic = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="topics">
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
        <section className="topics-section">
          <section className="top">
            <button className="back" onClick={() => navigate('/dashboard')}>back</button>
            <h2 className="profile">Topics</h2>
          </section>
          <div className="topics-content">
            {quizData.map((topic, index) => (
              <section key={index}>
                <button className="modify" onClick={() => handleClickModify(index)}>M</button>
                <button className="delete" onClick={() => handleClickDelete(index)}>D</button>
                <button className="topic-button" onClick={() => handleClickTopic(index)}>
                  <img src={`path/to/${topic.name}.png`} alt={topic.name} />
                </button>
              </section>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Topics;