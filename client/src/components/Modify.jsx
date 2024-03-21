import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuiz } from '../reducers/quizReducer';
import Header from './Header';
import Footer from './Footer';
import '../style/Quiz.css';
import userImage from '../images/user.png';

function Modify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const quizData = useSelector(state => state.quiz.quizData);
  const dispatch = useDispatch();

  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    if (quizData.length > 0) {
      setCurrentQuiz(quizData[id]);
    }
  }, [quizData, id]);

  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuiz = { ...currentQuiz };
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: updatedQuestion,
    };
    updatedQuiz.questions = updatedQuestions;
    setCurrentQuiz(updatedQuiz);
    updateLocalStorage(updatedQuiz);
  };  

  const handleCorrectAnswerChange = (questionIndex, updatedCorrectAnswer) => {
    const updatedQuiz = { ...currentQuiz };
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      correct_answer: updatedCorrectAnswer,
    };
    updatedQuiz.questions = updatedQuestions;
    setCurrentQuiz(updatedQuiz);
    updateLocalStorage(updatedQuiz);
  };
  
  const handleOptionChange = (questionIndex, optionIndex, updatedOption) => {
    const updatedQuiz = { ...currentQuiz };
    const updatedQuestions = [...updatedQuiz.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = updatedOption;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions,
    };
    updatedQuiz.questions = updatedQuestions;
    setCurrentQuiz(updatedQuiz);
    updateLocalStorage(updatedQuiz);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuiz = { ...currentQuiz };
    if (Array.isArray(updatedQuiz.questions)) {
      const updatedQuestions = [...updatedQuiz.questions];
      updatedQuestions.splice(index, 1);
      updatedQuiz.questions = updatedQuestions;
      setCurrentQuiz(updatedQuiz);
      updateLocalStorage(updatedQuiz);
    }
  };  

  const handleAddQuestion = () => {
    const updatedQuiz = { ...currentQuiz };
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions.push({
      question: '',
      options: ['', '', '', ''],
      correct_answer: '',
      points: 5,
    });
    updatedQuiz.questions = updatedQuestions;
    setCurrentQuiz(updatedQuiz);
    updateLocalStorage(updatedQuiz);
  };  

  const handleTopicNameChange = (updatedName) => {
    const updatedQuiz = { ...currentQuiz };
    updatedQuiz.name = updatedName;
    setCurrentQuiz(updatedQuiz);
    updateLocalStorage(updatedQuiz);
  };

  const handleUpdateQuiz = () => {
    // logic for PUT request here to update data in DB
    console.log('Updated Quiz Data:', currentQuiz);
    dispatch(updateQuiz({ id, updatedQuiz: quizData }));
  };

  const updateLocalStorage = (updatedQuiz) => {
    const updatedQuizData = quizData.map((item, index) =>
      index == id ? updatedQuiz : item
    );
    dispatch(updateQuiz({ id, updatedQuiz: updatedQuizData }));
    localStorage.setItem('quizData', JSON.stringify(updatedQuizData));
  };

  return (
    <div className="modify">
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
        <section className="modify-content">
          {currentQuiz && (
            <React.Fragment>
              <section className="top">
                <button className="back" onClick={() => navigate('/topics')}>back</button>
                <h2 className="title">Modify Quiz: {currentQuiz.name}</h2>
                <button className="update" onClick={handleUpdateQuiz}>Update</button>
              </section>
              <section className="questions">
                {currentQuiz.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="question">
                    <section className="question-modify">
                      <p className="ques">
                        <textarea
                          value={question.question}
                          placeholder="question"
                          onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                        />
                      </p>
                      <input
                        type="text"
                        value={question.correct_answer}
                        placeholder="Correct Answer"
                        onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
                      />
                      <button className="delete" onClick={() => handleDeleteQuestion(questionIndex)}>D</button>
                    </section>
                    <section className="options">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          />
                        </label>
                      ))}
                    </section>
                  </div>
                ))}
                <button className="add" onClick={handleAddQuestion}>+</button>
              </section>
              <section className="topic-name">
                <label>
                  Topic Name:
                  <input
                    type="text"
                    value={currentQuiz.name}
                    onChange={(e) => handleTopicNameChange(e.target.value)}
                  />
                </label>
              </section>
            </React.Fragment>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Modify;