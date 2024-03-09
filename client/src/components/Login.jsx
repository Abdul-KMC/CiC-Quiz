import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../App.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: 0
      });

    const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

  return (
    <div className='loginParent'>
        <Header />
        <div className='form-container'>
            <form className='loginForm' onSubmit={handleFormSubmit}>
              <label>Userame:</label>
              <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleInputChange} required />
              <label>Email:</label>
              <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} required />
              <label>Password:</label>
              <input type="text" name="password" placeholder='Password' value={formData.password} onChange={handleInputChange} required />
              <button type="submit">Login</button>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default Login