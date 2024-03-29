import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTopic, deleteQuiz } from '../reducers/quizReducer';
import baseurl from '../api';
import Header from './Header';
import Footer from './Footer';
import '../style/Dashboard.css';
import userImage from '../images/user.png';

function Topics() {
  const navigate = useNavigate();
  const quizData = useSelector(state => state.quiz.quizData);
  const user_id = useSelector(state => state.quiz.userId);
  const dispatch = useDispatch();

  const handleClickModify = (id) => {
    navigate(`/modify/${id}`);
  };

  const handleClickDelete = async (id) => {
    try {
      const quizId = quizData[id]._id;

      dispatch(deleteQuiz(id));
      await axios.delete(`${baseurl}/api/quiz/${quizId}`, { data: { userId: user_id } });
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleClickTopic = (id) => {
    const topic = quizData[id];
    if (topic.questions.length < 1) {
      alert("No questions in topic");
    } else {
      navigate(`/quiz/${id}`);
    }
  };
  

  const handleAddTopic = async () => {
    try {
      const newTopic = {
        name: 'New Topic',
        questions: [],
        highest_score: 0,
      };

      // Send POST request to add the new topic
      const response = await axios.post(`${baseurl}/api/quiz/${user_id}`, newTopic);
      const addedTopic = response.data;

      const updatedQuizData = [...quizData, addedTopic];
      dispatch(updateTopic(updatedQuizData));
    } catch (error) {
      console.error('Error adding topic:', error);
    }
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
                <section className="quiz-options">
                  <button className="modify" onClick={() => handleClickModify(index)}>Mod</button>
                  <button className="delete" onClick={() => handleClickDelete(index)}>Del</button>
                </section>
                <button className="topic-button" onClick={() => handleClickTopic(index)}>
                  {topic.name}
                </button>
              </section>
            ))}
          </div>
          <button className="addtopic" onClick={handleAddTopic}>+</button>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Topics;