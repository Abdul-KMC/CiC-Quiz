import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import '../App.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.setItem('quizData', []);
    navigate('/');
  };

  return (
    <div className='header'>
      <div className='title'>
        <h1>CiC Quiz</h1>
      </div>
      <div className='authButton'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Header