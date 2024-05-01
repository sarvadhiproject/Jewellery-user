import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (productId, quantity, price) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('Login first');
      return;
    }
    try {
      const userID = localStorage.getItem('userId')
      const response = await axios.post(`${ApiConfig.ApiPrefix}/add-to-cart`, {
        user_id: userID,
        product_id: productId,
        quantity: quantity,
        price: price,
      });

      const { cartItem } = response.data;

      // Update cart items and total in state
      setCartItems([...cartItems, cartItem]);
      return { success: true, message: 'Product Added to Cart Successfully' };
      // Update total in user context or store it in localStorage if needed
    } catch (error) {
      console.error('Error adding item to cart:', error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === 'Invalid quantity'
      ) {
        return { success: false, message: 'Invalid quantity. Please select a valid quantity.' };
      } else {
        return { success: false, message: 'Failed to add item to cart. Please try again later.' };
      }
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const response = await axios.delete(`${ApiConfig.ApiPrefix}/remove-from-cart/${cartId}`);

      const { total } = response.data;
      console.log(total);

      // Remove the deleted item from cartItems state
      const updatedCartItems = cartItems.filter(item => item.cart_id !== cartId);
      setCartItems  (updatedCartItems);

      // Update total in user context or store it in localStorage if needed
      // Example: setUserTotal(total);

      return { success: true, message: 'Product Removed from Cart Successfully' };
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return { success: false, message: 'Failed to remove item from cart. Please try again later.' };
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
