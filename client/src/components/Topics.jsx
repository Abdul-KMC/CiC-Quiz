import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../styling/Dashboard.css';
import userImage from '../images/user.png';
import computer from '../images/computer.png';
import mathematics from '../images/mathematics.jpg';
import science from '../images/science.png';
import sports from '../images/sports.png'

function Topics(props) {
  const navigate = useNavigate();
  const handleClickModify = (id) => {
    navigate(`/modify/${id}`);
  };
  const handleClickDelete = (id) => {
    axios.delete(`http://localhost:5173/api/topics/${id}`)
      .then(response => {
      })
      .catch(error => console.error('Error removing product:', error));
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
            <a href="Dashboard.jsx">Dashboard</a>
            <a href="Topics.jsx">Topics</a>
          </nav>
        </section>
        <section className="topics-content">
          <section>
            <button className="modify" onClick={() => handleClickModify(props.topic.id)}>M</button>
            <button className="delete" onClick={() => handleClickDelete(props.topic.id)}>D</button>
            <button className="topic-button" onClick={() => handleClickTopic(props.topic.id)}>
              <img src={computer} alt="Computer" />
            </button>
          </section>
          <section>
            <button className="modify">M</button>
            <button className="delete">D</button>
            <button className="topic-button" onClick={() => handleClickTopic()}>
              <img src={mathematics} alt="Mathematics" />
            </button>
          </section>
          <section>
            <button className="modify">M</button>
            <button className="delete">D</button>
            <button className="topic-button" onClick={() => handleClickTopic()}>
              <img src={science} alt="Science" />
            </button>
          </section>
          <section>
            <button className="modify">M</button>
            <button className="delete">D</button>
            <button className="topic-button" onClick={() => handleClickTopic()}>
              <img src={sports} alt="Sports" />
            </button>
          </section>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Topics