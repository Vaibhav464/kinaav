import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import loader from '../components/loader.gif'
import '../styles/section-2.css';

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');  // Get search query from URL
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from product.json
  useEffect(() => {
    setLoading(true);
    fetch('/product.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) =>{
        const combinedProducts = [
          ...(data.productContainer || []),
          ...(data.kinaavExclusiveProducts || []),
        ];
        setAllProducts(combinedProducts);
        setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

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
  
  const filterProductsByCategory = (category) => {
    return allProducts.filter((product) => product.category === category);
  };

  const categories = [
    { name: 'Cocktail Wear', key: 'cocktail' },
    { name: 'Relaxed Wear', key: 'relaxed' },
    { name: 'Corporate Wear', key: 'corporate' },
    { name: 'Club Wear', key: 'club' },
    { name: 'Casual Wear', key: 'casual' },
    { name: 'Fusion Wear', key: 'fusion' },
    { name: 'Sports Wear', key: 'sports' },
  ];

  if (loading) {
    return <div className="loading"><img src={loader} alt='Loading...'/></div>;
  }

  // Display error if fetch fails
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <section className="secondSection">
      <h1>Women's Wear</h1>
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
    </section>
  );
};

export default Products;