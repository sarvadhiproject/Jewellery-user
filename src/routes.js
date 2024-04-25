import ProductsByCategory from './components/Categories/ProductByCategory';
import Products from './components/product/Products';
import UserAccount from './components/userProfile/UserAccount';
import HomePage from './pages/Indexmain/HomePage';
import IndexMain from './pages/Indexmain/IndexMain';
import CartProduct from './components/cart/CartProduct';

const routes = [
  { path: "/", component: <IndexMain /> },
  { path: "/home", component: <HomePage /> },
  { path: "/account", component: <UserAccount /> },
  { path: "/product-by-category/:category_id", component: <ProductsByCategory /> },
  { path: "/product-details/:product_id", component: <Products /> },
  { path: "/cart", component: <CartProduct /> },
];

export default routes;
