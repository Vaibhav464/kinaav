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

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: (prev[product.id]?.quantity || 0) + 1,
      },
    }));
  };

  const changeQuantity = (id, type) => {
    console.log('Before update:', cart);
    setCart((prev) => {
      const newCart = { ...prev };
      const item = newCart[id];
  
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
        delete newCart[id];
      } else {
        newCart[id] = { ...item, quantity: newQuantity };
      }
      console.log('After update:', newCart);
      return newCart;
    });
};

return (
  <CartContext.Provider value={{ cart, addToCart, changeQuantity }}>
    {children}
  </CartContext.Provider>
);
};

export default CartContext;