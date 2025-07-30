import React, { useContext, useState, useEffect } from 'react';
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
  const [addressErrors, setAddressErrors] = useState({});
  const [isAddressValid, setIsAddressValid] = useState(false);

  // Load saved address from localStorage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('checkoutAddress');
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  // Save address to localStorage whenever it changes
  useEffect(() => {
    if (address.name || address.street || address.city || address.state || address.zip) {
      localStorage.setItem('checkoutAddress', JSON.stringify(address));
    }
  }, [address]);

  // Validate address fields
  const validateAddress = () => {
    const errors = {};
    
    if (!address.name.trim()) {
      errors.name = 'Full name is required';
    }
    
    if (!address.street.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!address.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!address.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!address.zip.trim()) {
      errors.zip = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(address.zip.trim())) {
      errors.zip = 'ZIP code must be 6 digits';
    }

    setAddressErrors(errors);
    setIsAddressValid(Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
  };

  // Calculate the total cost of all items in the cart
  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (acc, item) => acc + item.discountedPrice * item.quantity,
      0
    );
  };

  // Calculate original MRP total
  const calculateOriginalMRP = () => {
    return Object.values(cart).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  // Calculate total discount
  const calculateTotalDiscount = () => {
    return calculateOriginalMRP() - calculateTotal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (addressErrors[name]) {
      setAddressErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = () => {
    if (!validateAddress()) {
      alert('Please fill in all required address fields correctly.');
      return;
    }

    if (Object.values(cart).length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Create order object with address and cart data
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: Object.values(cart),
      total: calculateTotal(),
      address: address,
      status: 'Processing'
    };

    // Save order to localStorage (in a real app, this would go to a database)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart
    localStorage.removeItem('cart');

    alert(`Order placed successfully! Order ID: ${order.id}`);
    navigate('/orders'); // Navigate to orders page
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
          <span>Original MRP</span>
          <span>₹{calculateOriginalMRP().toLocaleString()}</span>
        </div>
        <div className="summary-item discount">
          <span>Product Discount</span>
          <span>-₹{calculateTotalDiscount().toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>₹{calculateTotal().toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-item total">
          <span>Total</span>
          <span>₹{calculateTotal().toLocaleString()}</span>
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
            <div key={item.cartKey} className="cart-item">
              <img src={`/img/${item.image}`} alt={item.name} />
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                {(item.size || item.weight) && (
                  <div className="item-variant">
                    {item.size ? `Size: ${item.size}` : `Weight: ${item.weight}`}
                  </div>
                )}
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