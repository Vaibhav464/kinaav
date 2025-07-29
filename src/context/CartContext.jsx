import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Helper function to generate unique key for cart items
  const generateCartKey = (product) => {
    const variantInfo = product.size || product.weight || 'default';
    return `${product.id}-${variantInfo}`;
  };

  const addToCart = (product) => {
    const cartKey = generateCartKey(product);
    setCart((prev) => ({
      ...prev,
      [cartKey]: {
        ...product,
        cartKey, // Store the cart key for reference
        quantity: (prev[cartKey]?.quantity || 0) + 1,
      },
    }));
  };

  const changeQuantity = (cartKey, type) => {
    console.log('Before update:', cart);
    setCart((prev) => {
      const newCart = { ...prev };
      const item = newCart[cartKey];
  
      if (!item) return newCart;  // If item doesn't exist, return
      
      let newQuantity;
      switch (type) {
        case '+':
          newQuantity = item.quantity + 1;
          break;
        case '-':
          newQuantity = item.quantity - 1;
          break;
        default:
          return newCart;
      }
      if (newQuantity <= 0) {
        delete newCart[cartKey];
      } else {
        newCart[cartKey] = { ...item, quantity: newQuantity };
      }
      console.log('After update:', newCart);
      return newCart;
    });
  };

  const removeAll = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQuantity, removeAll }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;