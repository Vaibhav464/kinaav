import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../context/CartContext';
import loader from '../components/loader.gif';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(null);
  const zoomRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/product.json');
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        // Combine products from both categories
        const allProducts = [...data.productContainer, ...data.kinaavExclusiveProducts];
        const foundProduct = allProducts.find((p) => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePincodeCheck = () => {
    // Mock delivery charge logic (replace with actual logic)
    if (pincode.length === 6) {
      setDeliveryCharge('Free delivery');
    } else {
      setDeliveryCharge('Invalid pincode');
    }
  };

  const handleShare = () => {
    // Mock share functionality (replace with actual logic)
    alert('Share this product!');
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100; // Percentage of cursor X position
    const y = ((e.pageY - top) / height) * 100; // Percentage of cursor Y position
    if (zoomRef.current) {
      zoomRef.current.style.backgroundImage = `url(/img/${product.image})`;
      zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
    }
  };

  const handleMouseLeave = () => {
    if (zoomRef.current) zoomRef.current.style.backgroundImage = 'none';
  };

  if (loading) return <div className='loading'><img src={loader} alt='Loading...'/></div>;
  if (error) return <div className='error'>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="product-detail-content">
        <div className="product-image-2">
        <img
            src={`/img/${product.image}`}
            alt={product.name}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          <div className="zoom-container" ref={zoomRef}></div>
        </div>
        <div className="product-info-2">
          <h2>{product.name}</h2>
          <p className="price">
            <del>₹{product.price}</del>&nbsp; 
            <ins>₹{product.discountedPrice}</ins>&nbsp; 
            <span className="discount">({discountPercentage}% off)</span>
          </p>
          <p className="description">{product.description}</p>
          <div className="sizes">
            <h4>Available Sizes:</h4>
            {product.sizes && product.sizes.length > 0 ? (
    <ul>
      {product.sizes.map((size, index) => (
        <li key={index}>{size}</li>
      ))}
    </ul>
  ) : (
    <p>No sizes available</p>
  )}
          </div>
          <div className="actions">
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="share-btn" onClick={handleShare}>
              <FontAwesomeIcon icon={faShareAlt} /> Share
            </button>
          </div>
          <div className="delivery-check">
            <h4>Check Delivery Charges</h4>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button onClick={handlePincodeCheck}>Check</button>
            {deliveryCharge && <p>Delivery Charge: {deliveryCharge}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;