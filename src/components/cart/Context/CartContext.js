import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import ApiConfig from '../../../config/ApiConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (productId, quantity, price, size) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      enqueueSnackbar('Login First', { variant: 'error' });
      console.log('Login first');
      return;
    }
    try {
      const userID = localStorage.getItem('userId')
      const response = await axios.post(`${ApiConfig.ApiPrefix}/cart/add`, {
        user_id: userID,
        product_id: productId,
        quantity: quantity,
        price: price,
        size: size
      });
      const { cartItem } = response.data;

      setCartItems([...cartItems, cartItem]);
      return { success: true, message: 'Product Added to Cart Successfully' };
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
      const response = await axios.delete(`${ApiConfig.ApiPrefix}/cart/remove`,
        { data: { cartItem_id: cartId } }
      );

      const { total } = response.data;
      console.log(total);

      const updatedCartItems = cartItems.filter(item => item.cart_id !== cartId);
      setCartItems(updatedCartItems);

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
