import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../context/CartContext';
// import '../styles/checkout.css';
import '../styles/global.css';

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  // Calculate the total cost of all items in the cart
  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (acc, item) => acc + item.discountedPrice * item.quantity,
      0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-page">
     <div className="checkout-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>Checkout</h2>
      </div>
      <div className="checkout-content">
        {/* Shipping Address */}
        <div className="address-section">
          <h3>Shipping Address</h3>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>
        {/* Payment Summary */}
      <div className="payment-summary">
        <h3>Payment Summary</h3>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>₹{calculateTotal().toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-item">
          <span>Tax (5%)</span>
          <span>₹{(calculateTotal() * 0.05).toLocaleString()}</span>
        </div>
        <div className="summary-item total">
          <span>Total</span>
          <span>₹{(calculateTotal() * 1.05).toLocaleString()}</span>
        </div>

      {/* Place order button */}
      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
        disabled={Object.values(cart).length === 0}
      >
        Place Order
      </button>
      </div>
    </div>
     <div className="cart-review">
        <h3>Cart Review</h3>
        {Object.values(cart).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          Object.values(cart).map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`/img/${item.image}`} alt={item.name} />
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-quantity">Quantity: {item.quantity}</div>
                <div className="item-price-2">
                  Price: ₹{item.discountedPrice.toLocaleString()}
                </div>
                <div className="item-subtotal">
                  Subtotal: ₹{(item.discountedPrice * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
        </div>     
    </div>
  );
};

export default CheckoutPage;