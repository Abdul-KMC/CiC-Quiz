import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styling/Quiz.css';
import userImage from '../images/user.png';

function Modify(props) {
  const navigate = useNavigate();
  return (
    <div className="quiz">
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
        <section className="quiz-content">
          <section className="top">
            <button className="back" onClick={() => navigate('/topics')}>back</button>
            <h2 className="title">Quiz Name</h2>
            <button className="update">Update</button>
          </section>
            <section className="question">
              <section className="modify">
                <p className="ques">What is 2 + 2?</p>
                <button className="change">M</button>
                <button className="delete">D</button>
              </section>
              <section className="options">
                <label><input type='radio' name="ques" value="3"></input>3</label>
                <label><input type='radio' name="ques" value="4"></input>4</label>
                <label><input type='radio' name="ques" value="5"></input>5</label>
                <label><input type='radio' name="ques" value="6"></input>6</label>
              </section>
              <button className="add">+</button>
            </section>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Modify