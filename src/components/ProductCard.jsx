import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../context/CartContext';  // Import CartContext
import '../styles/section-2.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);  // Use CartContext

  return (
    <Link to={`/products/${product.id}`}
    className="product-card">
      <div className="product-image">
        <img src={`/img/${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="price-cart">
          <span className="price">
            <del>₹{product.price}</del>&nbsp;
            <ins>₹{product.discountedPrice}</ins>
          </span>
          <button className="add-to-cart" onClick={(e) => {
              e.preventDefault(); // Prevent link navigation
              e.stopPropagation(); // Stop event bubbling to the Link
              addToCart(product);
            }}>
            <div className="cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="plus-badge">+</span>
            </div>
          </button>
        </div>
      </div>
      </Link>
  );
};

export default ProductCard;