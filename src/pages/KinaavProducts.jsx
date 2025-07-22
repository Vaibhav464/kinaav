import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import loader from '../components/loader.gif';
import '../styles/section-2.css';

const KinaavProducts = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Get search query from URL
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/product.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        const kinaavProducts = [...(data.kinaavExclusiveProducts || [])];
        setAllProducts(kinaavProducts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (query) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [query, allProducts]);

  // Filter products by category
  const filterProductsByCategory = (category) => {
    return allProducts.filter((product) => product.category === category);
  };

  // Define Kinaav categories
  const categories = [
    { name: 'Flour', key: 'flour' },
    { name: 'Pulses', key: 'pulses' },
    { name: 'Millets', key: 'millet' },
    { name: 'Spices', key: 'spice' },
  ];

  if (loading) {
    return <div className="loading"><img src={loader} alt='Loading...'/></div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <section className="secondSection">
      <h1>Kinaav Products</h1>
      {query ? (
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found for "{query}".</p>
          )}
        </div>
      ) : (
        categories.map((category) => {
          const productsInCategory = filterProductsByCategory(category.key);
          return productsInCategory.length > 0 ? (
            <div key={category.key}>
              <h2>{category.name}</h2>
              <div className="products-container">
                {productsInCategory.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <p key={category.key}>No products in {category.name} category.</p>
          );
        })
      )}
      {allProducts.length === 0 && !query && (
        <p>No Kinaav products available.</p>
      )}
    </section>
  );
};

export default KinaavProducts;