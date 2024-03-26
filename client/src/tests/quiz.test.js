import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import QuizTest from "../components/QuizTest";

test('Testing Quiz component elements', () => {
  // Mocking the necessary data and functions
  const mockQuizData = {
    name: 'Test Quiz',
    questions: [
      { question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3'], correct_answer: 'Option 1', points: 10 },
      { question: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3'], correct_answer: 'Option 2', points: 20 }
    ]
  };

  render(<QuizTest quizData={mockQuizData} />);

  // Test if the quiz content is rendered correctly
  expect(screen.getByText('Test Quiz')).toBeInTheDocument();
  expect(screen.getByText('Question 1')).toBeInTheDocument();
  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
  expect(screen.getByText('Option 3')).toBeInTheDocument();
});