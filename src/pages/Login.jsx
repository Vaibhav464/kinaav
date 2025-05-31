import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope, faLock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
    return re.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 8; // Minimum 8 characters
  };

  // Handle email input change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  // Handle password input change with validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(validatePassword(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'abc@xyz.com' && password === 'password') {
      navigate('/'); // Redirect to home page on successful login
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google login logic
    console.log('Google login clicked');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/img/Kinaav-logo-2.png" alt="Brand Logo" className="brand-logo" />
      </div>
      <div className="login-right">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <label htmlFor="email">Email</label>
        <div className="input-wrapper">
        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
        <input
          type="email"
          id="email"
          placeholder="abc@xyz.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailValid === true && <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />}
        {emailValid === false && <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />}
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
        <FontAwesomeIcon icon={faLock} className="input-icon" />
        <input
          type="password"
          id="password"
          placeholder="●●●●●●●●"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordValid === true && <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />}
        {passwordValid === false && <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />}
        </div>
        <button type="submit">Log In <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} /></button>
      </form>
      <div className="signup-section">
          <p>Don't have an account? <Link to="/signup"><b>Sign Up</b></Link></p>
          <div className='btn'>
          <button className="google-login" onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/color/30/000000/google-logo.png" alt="google"/>
            Login
          </button>
          <button className="facebook-login" onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/ios-filled/30/ffffff/facebook-new.png" alt="facebook"/>
            Login
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;