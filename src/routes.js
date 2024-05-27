import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsByCategory from './components/Categories/ProductByCategory';
import Checkout from './components/Checkout/Checkout';
import Cart from './components/cart/Cart';
import Products from './components/product/Products';
import UserAccount from './components/userProfile/UserAccount';
import HomePage from './pages/Indexmain/HomePage';
import IndexMain from './pages/Indexmain/IndexMain';
import Layout from './pages/Indexmain/Layout';
import OrderSuccess from './components/Checkout/components/checkoutSteps/OrderSuccess';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<Layout />}> {/* Wrap routes with Layout */}
      <Route index element={<IndexMain />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/account" element={<UserAccount />} />
      <Route path="/product-by-category" element={<ProductsByCategory />} />
      <Route path="/product-details" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<OrderSuccess/>} />
    </Route>
  </Routes>
);

export default RoutesConfig;
