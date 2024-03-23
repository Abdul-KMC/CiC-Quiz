import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import '../App.css';

function Login() {
    const [formData, setFormData] = useState({
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
        console.log('Login form submitted:', formData);
        navigate('/dashboard');
    };

    return (
        <div className='loginParent'>
          <Header />
            <div className='form-container'>
                <form className='loginForm' onSubmit={handleFormSubmit}>
                    <label>Email:</label>
                    <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} required />
                    <label>Password:</label>
                    <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleInputChange} required />
                    <button type="submit">Login</button>
                </form>
                <p>{errorMessage}</p>
                <p className='signin-switch' >Don't have an account yet? <span onClick={() => navigate('/signup')}><strong>SignUp</strong></span></p>
            </div>
          <Footer />
        </div>
    );
}

export default Login;