import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTopic, deleteQuiz } from '../reducers/quizReducer';
import Header from './Header';
import Footer from './Footer';
import '../style/Dashboard.css';
import userImage from '../images/user.png';

function Topics() {
  const navigate = useNavigate();
  const quizData = useSelector(state => state.quiz.quizData);
  console.log(quizData)
  const dispatch = useDispatch();

  const handleClickModify = (id) => {
    navigate(`/modify/${id}`);
  };

  const handleClickDelete = (id) => {
    dispatch(deleteQuiz(id));
    navigate('/topics');
  };  

  const handleClickTopic = (id) => {
    navigate(`/quiz/${id}`);
  };

  const handleAddTopic = () => {
    const newTopic = {
      name: '',
      questions: [{
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 5
      }],
      highest_score: 0,
    };
    const updatedQuiz = [...quizData, newTopic];
    dispatch(updateTopic(updatedQuiz));
    navigate(`/topics`);
  };  

  const handleModifyTopics = () => {
    updateBackend(quizData);
  };

  const updateBackend = (data) => {
    // Make a PUT request to update the backend
    // fetch('http://localhost:3000/quizData', {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Failed to update data');
    //     }
    //     // If successful, update local storage with the new data
    //     localStorage.setItem('quizData', JSON.stringify(data));
    //   })
    //   .catch((error) => {
    //     console.error('Error updating data:', error);
    //   });
    console.log("Quiz backend updated successful");
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
                  {topic.name}
                </button>
              </section>
            ))}
          </div>
          <button className="addtopic" onClick={handleAddTopic}>+</button>
          <button className="modifytopics" onClick={handleModifyTopics}>Modify Topics</button>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Topics;