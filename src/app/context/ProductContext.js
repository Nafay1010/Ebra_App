"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load cart from local storage when component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        const productsWithQuantity = data.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
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
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + quantity);
      toast.success("Product Updated");
      return;
    }

    setCart((prevCart) => [...prevCart, { ...product, quantity }]);
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
