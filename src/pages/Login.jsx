import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope, faLock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';
import { supabase } from '../lib/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailValid || !passwordValid) {
      setError('Please enter a valid email and password');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      if (isSignUp) {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user && !data.user.email_confirmed_at) {
          setError('Please check your email for a confirmation link before signing in.');
          setIsSignUp(false); // Switch back to login mode
        } else {
          navigate('/');
        }
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes('Invalid login credentials') || 
              error.message.includes('Email not confirmed')) {
            setError('Invalid email or password. If you don\'t have an account, please sign up first.');
          } else {
            throw error;
          }
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      if (error.message.includes('User already registered')) {
        setError('This email is already registered. Please sign in instead.');
        setIsSignUp(false);
      } else {
        setError(error.message || `Error ${isSignUp ? 'signing up' : 'logging in'}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      setError(error.message || 'Error signing in with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      setError(error.message || 'Error signing in with Facebook. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/img/Kinaav-logo-2.png" alt="Brand Logo" className="brand-logo" />
      </div>
      <div className="login-right">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? (isSignUp ? 'Signing up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Log In')} 
          {!loading && <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} />}
        </button>
      </form>
      <div className="signup-section">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
            <button 
              type="button" 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', padding: '0', margin: '0 0 0 5px' }}
            >
              <b>{isSignUp ? 'Sign In' : 'Sign Up'}</b>
            </button>
          </p>
          <div className='btn'>
          <button className="google-login" onClick={handleGoogleLogin} disabled={loading}>
            <img src="https://img.icons8.com/color/30/000000/google-logo.png" alt="google"/>
            {loading ? 'Processing...' : 'Login'}
          </button>
          <button className="facebook-login" onClick={handleFacebookLogin} disabled={loading}>
            <img src="https://img.icons8.com/ios-filled/30/ffffff/facebook-new.png" alt="facebook"/>
            {loading ? 'Processing...' : 'Login'}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;