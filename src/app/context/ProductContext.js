"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const productsWithQuantity = data.map((product) => ({
        ...product,
        quantity: 0,
      }));
      setProducts(productsWithQuantity);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Update total price whenever cart changes
  useEffect(() => {
    const price = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(price);
  }, [cart]);

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success("Product Added");
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    toast.success("Product Removed");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        totalPrice,
        updateQuantity,
        addToCart,
        removeFromCart,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
