import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/section-2.css';
import '../styles/global.css';

const Cart = ({ onClose }) => {
  const { cart, changeQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return Object.values(cart).reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
    onClose(); // Close the cart sidebar (optional)
  };

  return (
    <>
      <div className={`backdrop ${cart ? 'active' : ''}`} onClick={onClose} />

      <div className={`sidebar ${cart ? 'active' : ''}`}>
        <h3>Shopping Cart</h3>
        <button className="closebtn" onClick={onClose}>x
        </button>

        <div className="listCart">
          {Object.values(cart).map((item) => (
            <div key={item.id} className="item">
              <img src={`/img/${item.image}`} alt={item.name} />
              <div className="content">
                <div className="name">{item.name}</div>
                <div className="item-price">₹{item.discountedPrice.toLocaleString()} / 1 product</div>
              </div>
              <div className="quantity">
                {/* Use changeQuantity directly */}
                <button onClick={() => changeQuantity(item.id, '-')}>-</button>
                <span className="value">{item.quantity}</span>
                <button onClick={() => changeQuantity(item.id, '+')}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
          <div className="shipping">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;