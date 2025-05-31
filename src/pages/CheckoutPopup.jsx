import React from 'react';
import '../styles/global.css';

const CheckoutPopup = ({ onClose }) => {
  return (
        <div className="checkout-popup">
          <div className="popup-content">
          <span className="close-popup" onClick={onClose}>
              &times;
            </span>
            <h3>Ordering Information</h3>
            <p>Currently, we are not taking online orders. Please contact us to place your order.</p>
            <div className="contact">
              <p>📞 <a href="tel:+919717267673">+91-9717267673</a></p>
              <p>📧 <a href="mailto:support@kinaav.in">support@kinaav.in</a></p>
            </div>
          </div>
        </div>
  );
};

export default CheckoutPopup;