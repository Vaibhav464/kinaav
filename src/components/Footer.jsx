import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Kinaav</h3>
          <p>Your trusted destination for quality products and exceptional service.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="mailto:support@kinaav.in">Contact</a></li>
            <li><a href="/">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Newsletter</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/adamneveclothing"><i className="fab fa-facebook-f"></i></a>
            <a href="/"><i className="fab fa-instagram"></i></a>
            <a href="https://x.com/AdamneveClothin"><i className="fab fa-x-twitter"></i></a>
            <a href="https://www.linkedin.com/in/adam-n-eve-2635a146/"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Kinaav. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;