import React, { useState } from 'react';

function QuizTest({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(quizData ? Array(quizData.questions.length).fill('') : []);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowCorrectAnswer(false);
    }
  };

  const handleNextClick = () => {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowCorrectAnswer(false);
    }
  };

  const handleConfirmClick = () => {
    // Implement confirm logic here if needed
  };

  const handleAnswerClick = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handlePlayAgainClick = () => {
    setSelectedAnswers(quizData ? Array(quizData.questions.length).fill('') : []);
    setShowCorrectAnswer(false);
  };

  return (
    <div className="quiz-test">
      {quizData && (
        <React.Fragment>
          <h2 className="title">{quizData.name}</h2>
          <section className="quiz-handler">
            <section className="question">
              <p className="ques">{quizData.questions[currentQuestionIndex].question}</p>
              {quizData.questions[currentQuestionIndex].options.map((option, index) => (
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
                <button className="next" onClick={handleNextClick} disabled={!quizData || currentQuestionIndex === quizData.questions.length - 1}>next</button>
              </section>
              <button className="confirm" onClick={handleConfirmClick}>confirm</button>
              <button className="playagain" onClick={handlePlayAgainClick}>play again</button>
              <button className="answer" onClick={() => setShowCorrectAnswer(true)}>
                {showCorrectAnswer
                  ? `Answer: ${quizData.questions[currentQuestionIndex].correct_answer}`
                  : 'answer'}
              </button>
            </section>
          </section>
        </React.Fragment>
      )}
    </div>
  );
}

export default QuizTest;