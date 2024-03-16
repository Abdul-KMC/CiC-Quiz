import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../style/Dashboard.css';
import userImage from '../images/user.png';

function UserProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    qualification: '',
    level: '',
    major: '',
    designation: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5173/api/user/${id}`)
      .then(response => {
      })
      .catch(error => console.error('Error removing product:', error));
};
  return (
    <div className="user-profile">
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
        <section className="user-details">
          <section className="top">
            <button className="back" onClick={() => navigate('/dashboard')}>back</button>
            <h2 className="profile">User Profile</h2>
          </section>
          <div className="form-container">
            <form className='loginForm' onSubmit={handleFormSubmit}>
              <label>Userame:</label>
              <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleInputChange} required />
              <label>Name:</label>
              <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} required />
              <label>Qualification:</label>
              <input type="text" name="qualification" placeholder='Qualification' value={formData.qualification} onChange={handleInputChange} />
              <label>Education Level:</label>
              <input type="text" name="level" placeholder='Education Level' value={formData.level} onChange={handleInputChange} />
              <label>Major:</label>
              <input type="text" name="major" placeholder='Major' value={formData.major} onChange={handleInputChange} />
              <label>Designation:</label>
              <input type="text" name="designation" placeholder='Designation' value={formData.designation} onChange={handleInputChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile