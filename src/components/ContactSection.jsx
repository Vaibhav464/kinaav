import React from 'react';
import '../styles/section-4.css';

const ContactSection = () => {
  return (
    <section className="fourthSection">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Our Location</h3>
            <p>
              H-258, SAURABH VIHAR, HARI NAGAR EXTN BADARPUR, NEW DELHI, 110044
            </p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <h3>Phone Number</h3>
            <a href="tel:+919717267673">+91-9717267673</a>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email Address</h3>
            <a href="mailto:kinaavf@yahoo.com">kinaavf@yahoo.com</a>
          </div>
        </div>

        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;