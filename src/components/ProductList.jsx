import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import loader from '../components/loader.gif';
import '../styles/section-2.css';

const ProductList = ({ category, viewAllLink }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products for category:', category);
        const response = await fetch('http://localhost:3000/api/products');
        // const response = await fetch('public/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
      console.log('All products:', data);
        // Handle the nested structure
      if (data && data.length > 0) {
        let productsArray = [];
        if (category === 'productContainer') {
          productsArray = data[0].productContainer || [];
        } else if (category === 'kinaavExclusiveProducts') {
          productsArray = data[0].kinaavExclusiveProducts || [];
        }

        console.log('Filtered products:', productsArray);
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -296, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 296, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="loading"><img src={loader} alt="Loading..." /></div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-container-wrapper">
      <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
        ❮
      </button>
      <div className="products-container" ref={containerRef}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length > 0 && (
          <div className="view-all-container" key="view-all">
            <Link to={viewAllLink} className="view-all-button">
              <span className="view-all-text">View All</span>
              <span className="view-all-icon">❯</span>
            </Link>
          </div>
        )}
      </div>
      <button className="scroll-arrow right-arrow" onClick={scrollRight}>
        ❯
      </button>
    </div>
  );
};

export default ProductList;