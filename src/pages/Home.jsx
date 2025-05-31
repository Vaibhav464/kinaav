import React from 'react';
import Slider from '../components/Slider';
import ProductList from '../components/ProductList';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import '../styles/section-1.css';
import '../styles/section-2.css';
import '../styles/section-3.css';
import '../styles/section-4.css';

const Home = () => {

  return (
    <main>
      <section className="firstSection">
        <Slider />
      </section>

      <hr id="products" />

      <section className="secondSection">
      <h2>Featured Products</h2>
      <ProductList category="productContainer"
      viewAllLink="/products?category=productContainer"
      />
      
      <h2>Kinaav Exclusive</h2>
      <ProductList category="kinaavExclusiveProducts"
      viewAllLink="/KinaavProducts"
      />
    </section>

      <hr id="about" />

      <AboutSection />

      <hr id="contact" />
      
      <ContactSection />
    </main>
  );
};

export default Home;