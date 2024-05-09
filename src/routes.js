import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsByCategory from './components/Categories/ProductByCategory';
import Checkout from './components/Checkout/Checkout';
import Cart from './components/cart/Cart';
import Products from './components/product/Products';
import UserAccount from './components/userProfile/UserAccount';
import HomePage from './pages/Indexmain/HomePage';
import IndexMain from './pages/Indexmain/IndexMain';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<IndexMain />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/account" element={<UserAccount />} />
    <Route path="/product-by-category/:category_id" element={<ProductsByCategory />} />
    <Route path="/product-details/:product_id" element={<Products />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
);

export default RoutesConfig;
