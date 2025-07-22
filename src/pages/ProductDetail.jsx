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
  const [selectedVariant, setSelectedVariant] = useState(null);

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
        // Support string and number id
        const foundProduct = allProducts.find((p) => p.id === parseInt(id) || p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedVariant(foundProduct.variants ? foundProduct.variants[0] : null);
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

  // Determine if this is a size-based or weight-based product
  const isSizeBased = product.variants && product.variants[0] && product.variants[0].size;
  const isWeightBased = product.variants && product.variants[0] && product.variants[0].weight;

  const discountPercentage = selectedVariant ? Math.round(
    ((selectedVariant.price - selectedVariant.discountedPrice) / selectedVariant.price) * 100
  ) : 0;

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
            <del>₹{selectedVariant ? selectedVariant.price : ''}</del>&nbsp; 
            <ins>₹{selectedVariant ? selectedVariant.discountedPrice : ''}</ins>&nbsp; 
            {selectedVariant && <span className="discount">({discountPercentage}% off)</span>}
          </p>
          <p className="description">{product.description}</p>
          <div className="sizes">
            <h4>Available {isSizeBased ? 'Sizes' : isWeightBased ? 'Weights' : 'Variants'}:</h4>
            {product.variants && product.variants.length > 0 ? (
              <ul className="variant-selector">
                {product.variants.map((variant, index) => (
                  <li key={index}>
                    <button
                      className={selectedVariant === variant ? 'selected' : ''}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {isSizeBased ? variant.size : isWeightBased ? variant.weight : 'Variant'}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No variants available</p>
            )}
          </div>
          <div className="actions">
            <button className="add-to-cart-btn" onClick={() => selectedVariant && addToCart({ ...product, ...selectedVariant })} disabled={!selectedVariant}>
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