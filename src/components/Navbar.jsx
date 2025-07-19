import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faChevronDown, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';
import CartContext from '../context/CartContext';
import '../styles/navbar.css';
import '../styles/global.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');;
  const [isCartOpen, setIsCartOpen] = useState(false);  // State for cart sidebar visibility
  const [searchTerm, setSearchTerm] = useState('');  // State for search term
  const navigate = useNavigate();  // For navigation

  // Use CartContext to access cart and cart count
  const { cart } = useContext(CartContext);
  const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isCartOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);  // Save theme to localStorage
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);  // Navigate to search results
      setSearchTerm('');  // Clear search term
    }
  };

  return (
    <header>
      <nav className="main-nav">
        <div className="left">
          <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>

          <Link to="/" className="home">
            <img src="/img/Kinaav-logo-2.png" alt="Kinaav logo" />
          </Link>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="#about" 
    onClick={(e) => {
      e.preventDefault();
      const aboutSection = document.querySelector('#about');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    About
  </Link></li>
            <li className="dropdown">
              <button className="dropbtn">
                Products <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <div className="dropdown-content">
                {/* Fashion */}
                  <div className="sub-dropdown">
                  <span>Fashion <FontAwesomeIcon icon={faChevronRight} /></span>
                  <div className="sub-dropdown-content">
                    <Link to="/products">Women's Wear</Link>
                    <Link className='disabled' to="/">Men's Wear</Link>
                  </div>
                </div>

                {/* Home Linen */}
                <div className="sub-dropdown">
                  <span>Home Linen <FontAwesomeIcon icon={faChevronRight} /></span>
                  <div className="sub-dropdown-content">
                    <Link className='disabled' to="/">Towels</Link>
                    <Link className='disabled' to="/">Bedsheets</Link>
                    <Link className='disabled' to="/">Pillows</Link>
                    <Link className='disabled' to="/">Blankets</Link>
                  </div>
                </div>

                {/* Kitchen */}
                <div className="sub-dropdown">
                  <span>Kitchen <FontAwesomeIcon icon={faChevronRight} /></span>
                  <div className="sub-dropdown-content">
                    <Link to="/KinaavProducts">Flour</Link>
                    <Link to="/KinaavProducts">Pulses</Link>
                  </div>
                </div>

                {/* Art n Craft */}
                <div className="sub-dropdown disabled">
                <span>Art n Craft</span>
                </div>
              </div>
            </li>
            <li><Link 
    to="#contact" 
    onClick={(e) => {
      e.preventDefault();
      const Contact = document.querySelector('#contact');
      Contact?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    Contact
  </Link></li>
          </ul>
        </div>

        <div className="right">
          <div className="container">
            <input type="checkbox" id="check" checked={theme === 'dark'} onChange={toggleTheme} />
            <label htmlFor="check" className="button"></label>
          </div>

          <form role="search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <div className="user-dropdown">
            <button className="user-btn">
              <FontAwesomeIcon icon={faUser} />
            </button>
            <div className="user-dropdown-content">
              <Link to="/login">Login/SignUp</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/account">My Account</Link>
              {/* <Link className="disabled" to="/address">Address</Link> */}
            </div>
          </div>

          {/* Cart button */}
          <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
            
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>

        {/* Cart sidebar */}
        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </nav>
    </header>
  );
};

export default Navbar;