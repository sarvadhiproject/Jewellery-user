import React, { useState, useEffect, Suspense } from 'react';
import { Row, Col } from 'reactstrap';
import NavbarPage from '../../components/Navbar/Navbar_Page';
import Footer from '../../components/Footer/footer';
import CartProduct from './component/CartProduct';
import OrderSummary from './component/OrderSummary';
import { CartProvider } from './Context/CartContext';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import { Link } from 'react-router-dom';
import emptycart from "../../assets/images/Empty Cart.svg";
import loginfirst from "../../assets/images/login first.svg";

const Loader = () => {
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner">Loading...</div>
            </div>
        </div>
    );
};

const Cart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(accessToken ? true : false);

        if (isLoggedIn) {
            fetchCartItems();
        }

    }, [isLoggedIn]);

    const fetchCartItems = async () => {
        try {
            const userID = localStorage.getItem('userId');
            const response = await axios.get(`${ApiConfig.ApiPrefix}/cart/${userID}`);
            console.log(response.data);
            setCartItems(response.data.cartItems);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setCartItems([]);
            } else {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    const updateCartItems = async (removedCartId) => {
        try {
            const userID = localStorage.getItem('userId');
            const response = await axios.get(`${ApiConfig.ApiPrefix}/cart/${userID}`);
            setCartItems(response.data.cartItems);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setCartItems([]);
            } else {
                console.error('Error fetching updated cart items:', error);
            }
        }
    };

    return (
        <React.Fragment>
            <NavbarPage />
            <div className="container" style={{ padding: '50px', marginTop: '30px' }}>
                <Row>
                    {isLoggedIn ? (
                        cartItems.length === 0 ? (
                            <Col md="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', marginTop: '30px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={emptycart} alt='Empty Cart' style={{ width: '120px' }} />
                                    <h3 style={{ fontFamily: 'Nunito Sans' }}>Your cart is empty</h3>
                                    <Link to="/" ><label className='cart-product-name' style={{ color: '#832729', fontSize: '13px' }} > Continue Shopping </label></Link>
                                </div>
                            </Col>
                        ) : (
                            <React.Fragment>
                                <Col md="7">
                                    <Suspense fallback={<Loader />}>
                                        <CartProvider>
                                            <CartProduct cartItems={cartItems} updateCartItems={updateCartItems} />
                                        </CartProvider>
                                    </Suspense>
                                </Col>
                                <Col md="5">
                                    <Suspense fallback={<Loader />}>
                                        <OrderSummary cartItems={cartItems} />
                                    </Suspense>
                                </Col>
                            </React.Fragment>
                        )
                    ) : (
                        <Col md="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', marginTop: '30px', color: '#832729' }}>
                            <div style={{ textAlign: 'center' }}>
                                <img src={loginfirst} alt='login first' />
                                <h3 style={{ fontFamily: 'Nunito Sans' }}>Please login to view cart items</h3>
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Cart;





