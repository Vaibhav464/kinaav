import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import loader from '../components/loader.gif';
import '../styles/section-2.css';
import '../styles/navbar.css';
import '../styles/global.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');  // Get search query from URL
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/product.json');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          const allProducts = [...data.productContainer, ...data.kinaavExclusiveProducts];
          const filtered = allProducts.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredProducts(filtered);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (query) {
        fetchProducts();
      } else {
        setFilteredProducts([]);
        setLoading(false);
        setError(null);
      }
    }, [query]);
    if (!query) {
      return (
        <section className="secondSection">
          <div className="search-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2>Search Results</h2>
          </div>
          <p>Please enter a search term.</p>
        </section>
      );
    }
  
    if (loading) {
      return <div className="loading"><img src={loader} alt='Loading...'/></div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }
  
    // Render search results or a "no results" message
    return (
      <section className="secondSection">
        <div className="search-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>Search Results for "{query}"</h2>
        </div>
        {filteredProducts.length === 0 ? (
          <p>No products found for "{query}"</p>
        ) : (
          <div className="products-container">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    );
  };
  
  export default SearchResults;