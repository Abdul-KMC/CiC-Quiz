import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import '../App.css';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Registration form submitted:', formData);
        navigate('/login');
    };

    return (
        <div className='loginParent'>
            <Header />
            <div className='form-container'>
                <form className='loginForm' onSubmit={handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleInputChange} required />
                    <label>Email:</label>
                    <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} required />
                    <label>Password:</label>
                    <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleInputChange} required />
                    <button type="submit">SignUp</button>
                </form>
                <p>{errorMessage}</p>
                <p className='signin-switch'>Already have an account? <span onClick={() => navigate('/')}><strong>Login</strong></span></p>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;