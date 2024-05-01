import ProductsByCategory from './components/Categories/ProductByCategory';
import Cart from './components/cart/Cart';
import Products from './components/product/Products';
import UserAccount from './components/userProfile/UserAccount';
import HomePage from './pages/Indexmain/HomePage';
import IndexMain from './pages/Indexmain/IndexMain';

const routes = [
  { path: "/", component: <IndexMain /> },
  { path: "/home", component: <HomePage /> },
  { path: "/account", component: <UserAccount /> },
  { path: "/product-by-category/:category_id", component: <ProductsByCategory /> },
  { path: "/product-details/:product_id", component: <Products /> },
  { path: "/cart", component: <Cart/> },
];

export default routes;
