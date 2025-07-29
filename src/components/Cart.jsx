import React, { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/section-2.css';
import '../styles/global.css';

const Cart = ({ onClose }) => {
  const { cart, changeQuantity, removeAll } = useContext(CartContext);
  const navigate = useNavigate();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const calculateTotal = () => {
    return Object.values(cart).reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
    onClose(); // Close the cart sidebar (optional)
  };

  const handleRemoveAll = () => {
    setShowConfirmPopup(true);
  };

  const confirmRemoveAll = () => {
    removeAll();
    setShowConfirmPopup(false);
  };

  const cancelRemoveAll = () => {
    setShowConfirmPopup(false);
  };

  return (
    <>
      <div className={`backdrop ${cart ? 'active' : ''}`} onClick={onClose} />

      <div className={`sidebar ${cart ? 'active' : ''}`}>
        <h3>Shopping Cart</h3>
        {Object.values(cart).length > 0 && (
          <button className="remove-all-btn" onClick={handleRemoveAll}>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        )}
        <button className="closebtn" onClick={onClose}>x
        </button>


        <div className="listCart">
          {Object.values(cart).map((item) => (
            <div key={item.cartKey} className="item">
              <img src={`/img/${item.image}`} alt={item.name} />
              <div className="content">
                <div className="name">{item.name}</div>
                {(item.size || item.weight) && (
                  <div className="variant-info">
                    {item.size ? `Size: ${item.size}` : `Weight: ${item.weight}`}
                  </div>
                )}
                <div className="item-price">₹{item.discountedPrice.toLocaleString()} / 1 product</div>
              </div>
              <div className="quantity">
                {/* Use changeQuantity with cartKey */}
                <button onClick={() => changeQuantity(item.cartKey, '-')}>-</button>
                <span className="value">{item.quantity}</span>
                <button onClick={() => changeQuantity(item.cartKey, '+')}>+</button>
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

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="confirm-popup-overlay">
          <div className="confirm-popup">
            <h4>Remove All Items</h4>
            <p>Are you sure you want to remove all items from your cart?</p>
            <div className="confirm-popup-buttons">
              <button className="confirm-btn" onClick={confirmRemoveAll}>
                Yes, Remove All
              </button>
              <button className="cancel-btn" onClick={cancelRemoveAll}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;