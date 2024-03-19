import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuiz } from '../reducers/quizReducer';
import Header from './Header';
import Footer from './Footer';
import '../style/Quiz.css';
import userImage from '../images/user.png';

function Quiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const quizData = useSelector(state => state.quiz.quizData);
  const dispatch = useDispatch();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    if (quizData.length > 0) {
      setCurrentQuiz(quizData[id]);
      setSelectedAnswers(Array(quizData[id]?.questions.length).fill(''));
    }
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
    const updatedQuizData = quizData.map((quiz, index) => {
      if (index.toString() === id) {
        quiz.questions.forEach((question, index) => {
          if (selectedAnswers[index] === question.correct_answer) {
            score += question.points;
          }
        });
  
        if (score > quiz.highest_score) {
          return { ...quiz, highest_score: score };
        } else {
          alert('Score is less than highest score.');
          return quiz;
        }
      } else {
        return quiz;
      }
    });
  
    dispatch(updateQuiz({ id, updatedQuiz: updatedQuizData }));
    localStorage.setItem('quizData', JSON.stringify(updatedQuizData));
  };  

  const handleAnswerClick = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handlePlayAgainClick = () => {
    setSelectedAnswers(Array(currentQuiz.questions.length).fill(''));
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
                      <input
                        type="radio"
                        name={`ques${currentQuestionIndex}`}
                        value={option}
                        checked={selectedAnswers[currentQuestionIndex] === option}
                        onChange={() => handleAnswerClick(option)}
                      />
                      {option}
                    </label>
                  ))}
                </section>
                <section className="buttons">
                  <section className="navbuttons">
                    <button className="prev" onClick={handlePrevClick} disabled={currentQuestionIndex === 0}>prev</button>
                    <button className="next" onClick={handleNextClick} disabled={currentQuestionIndex === currentQuiz.questions.length - 1}>next</button>
                  </section>
                  <button className="confirm" onClick={handleConfirmClick}>confirm</button>
                  <button className="playagain" onClick={handlePlayAgainClick}>play again</button>
                  <button className="answer" onClick={() => setShowCorrectAnswer(true)}>
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