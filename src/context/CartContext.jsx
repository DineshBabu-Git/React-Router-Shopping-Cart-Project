import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const increaseQty = (productId) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decreaseQty = (productId) => {
    setCartItems((prev) =>
      prev
        .map((p) => (p.id === productId ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
    );
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (productId) => cartItems.some((p) => p.id === productId);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.1; 
  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        isInCart,
        subtotal,
        discount,
        total,
      }}>
      {children}
    </CartContext.Provider>
  );
}
