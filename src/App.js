import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyAccount from './pages/MyAccount';
import OrderPage from './pages/OrderPage';
import Home from './pages/Home';
import Products from './pages/Products';
import SearchResults from './pages/SearchResults';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import KinaavProducts from './pages/KinaavProducts';
import ProductDetail from './pages/ProductDetail';
import LoadingBar from 'react-top-loading-bar';
import './styles/global.css';

function AppContent() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const loadingBarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
    setShowScrollButton(window.scrollY > 300);
      // if (window.scrollY > 300) 
      // {
      //   setShowScrollButton(true);
      // } else {
      //   setShowScrollButton(false);
      // }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart(); // Start the loading bar
      const timer = setTimeout(() => {
        loadingBarRef.current.complete(); // Complete after 1 second
      }, 1000);
      return () => clearTimeout(timer); // Cleanup on unmount or route change
    }
  }, [location]);

  return (
      <>
        <Navbar />
        <LoadingBar
          color="rgb(3, 9, 46)"
          ref={loadingBarRef}
          height={3}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/KinaavProducts" element={<KinaavProducts />} />
          <Route path="/search" element={<SearchResults />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/+919717267673"
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>

        {/* Scroll to Top Button */}
        <button id="scrollToTop" className={`scroll-top ${showScrollButton ? 'visible' : ''}`}
          onClick={scrollToTop}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;