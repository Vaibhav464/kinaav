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
  const featuredProductContainerIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const featuredKinaavIds = [
    "KPGMW", "KPGMS", "KPGMD", "KPDKC", "KPDGC", "KPCD"
  ];

  return (
    <main>
      <section className="firstSection">
        <Slider />
      </section>

      <hr id="products" />

      <section className="secondSection">
      <h2>Featured Products</h2>
      <ProductList
        category="productContainer"
        viewAllLink="/products?category=productContainer"
        featuredIds={featuredProductContainerIds}
      />
      
      <h2>Kinaav Exclusive</h2>
      <ProductList
        category="kinaavExclusiveProducts"
        viewAllLink="/KinaavProducts"
        featuredIds={featuredKinaavIds}
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