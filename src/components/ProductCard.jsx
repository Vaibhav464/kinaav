import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/section-2.css';

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants && product.variants[0]);
  const isSizeBased = selectedVariant && selectedVariant.size;
  const isWeightBased = selectedVariant && selectedVariant.weight;

  const handleVariantChange = (e) => {
    const value = e.target.value;
    const variant = product.variants.find(v => (isSizeBased ? v.size : v.weight) === value);
    setSelectedVariant(variant);
  };

  // Helper to get the value for dropdown/text
  const getVariantValue = (variant) => isSizeBased ? variant.size : isWeightBased ? variant.weight : '';

  return (
    <Link to={`/products/${product.id}`}
    className="product-card">
      <div className="product-image">
        <img src={`/img/${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="price-variant-row">
          <span className="price">
            <del>₹{selectedVariant ? selectedVariant.price : ''}</del>&nbsp;
            <ins>₹{selectedVariant ? selectedVariant.discountedPrice : ''}</ins>
          </span>
          {product.variants && product.variants.length > 1 && (
            <select
              className="variant-dropdown"
              value={getVariantValue(selectedVariant)}
              onChange={handleVariantChange}
              onClick={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
              onTouchStart={e => e.stopPropagation()}
            >
              {product.variants.map((variant, idx) => (
                <option key={idx} value={getVariantValue(variant)}>
                  {getVariantValue(variant)}
                </option>
              ))}
            </select>
          )}
          {product.variants && product.variants.length === 1 && (
            <span className="variant-label single-variant">{getVariantValue(selectedVariant)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;