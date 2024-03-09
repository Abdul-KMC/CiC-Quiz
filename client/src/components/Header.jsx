import React from 'react'
import '../App.css';

function Header() {
  return (
    <div className='header'>
      <div className='title'>
        <h1>CiC Quiz</h1>
      </div>
      <div className='authButton'>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Header