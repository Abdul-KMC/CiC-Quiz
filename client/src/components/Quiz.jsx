import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../style/Quiz.css';
import userImage from '../images/user.png';

function Quiz({ quizData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    const foundQuiz = quizData[id];
    setCurrentQuiz(foundQuiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowCorrectAnswer(false);
  }, [quizData, id]);

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowCorrectAnswer(false);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowCorrectAnswer(false);
    }
  };

  const handleConfirmClick = () => {
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswer === question.correct_answer) {
        score += question.points;
      }
    });

    if (score > currentQuiz.highest_score) {
      const updatedQuiz = { ...currentQuiz, highest_score: score };
      setCurrentQuiz(updatedQuiz);
      updateLocalStorage(updatedQuiz);
    } else {
      // Show an alert if the score is less than the highest score
      alert('Score is less than highest score.');
    }
  };
  
  const updateLocalStorage = (updatedQuiz) => {
    const updatedQuizData = quizData.map((item, index) =>
      index == id ? updatedQuiz : item
    );
    updateQuizData(updatedQuizData);
    localStorage.setItem('quizData', JSON.stringify(updatedQuizData));
  };

  const handleAnswerClick = () => {
    setShowCorrectAnswer(true);
  };

  const handlePlayAgainClick = () => {
    setSelectedAnswer('');
    setShowCorrectAnswer(false);
  };

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
          {currentQuiz && (
            <React.Fragment>
              <section className="top">
                <button className="back" onClick={() => navigate('/topics')}>back</button>
                <h2 className="title">{currentQuiz.name}</h2>
                <p className="score">Highest: {currentQuiz.highest_score}</p>
              </section>
              <section className="quiz-handler">
                <section className="question">
                  <p className="ques">{currentQuiz.questions[currentQuestionIndex].question}</p>
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <label key={index}>
                      <input type="radio" name="ques" value={option} checked={selectedAnswer === option} onChange={() => setSelectedAnswer(option)}/>{option}</label>
                  ))}
                </section>
                <section className="buttons">
                  <section className="navbuttons">
                    <button className="prev" onClick={handlePrevClick} disabled={currentQuestionIndex === 0}>prev</button>
                    <button className="next" onClick={handleNextClick} disabled={currentQuestionIndex === currentQuiz.questions.length - 1}>next</button>
                  </section>
                  <button className="confirm" onClick={handleConfirmClick}>confirm</button>
                  <button className="playagain" onClick={handlePlayAgainClick}>play again</button>
                  <button className="answer" onClick={handleAnswerClick}>
                    {showCorrectAnswer
                      ? `Answer: ${currentQuiz.questions[currentQuestionIndex].correct_answer}`
                      : 'answer'}
                  </button>
                </section>
              </section>
            </React.Fragment>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Quiz;