import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import { Row, Col } from 'reactstrap';
import CheckoutSummary from './components/CheckoutSummary';
import { Link } from 'react-router-dom';
import CheckoutSteps from './components/checkoutSteps/CheckoutSteps';
import emptycart from "../../assets/images/Empty Cart.svg";
import loginfirst from "../../assets/images/login first.svg";
import OrderSuccess from './components/checkoutSteps/OrderSuccess';


const Loader = () => {
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner">Loading...</div>
            </div>
        </div>
    );
};

const Checkout = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const couponCode = searchParams.get('coupon');
    const discount = searchParams.get('discount');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);

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
            setCartItems(response.data);
            console.log(couponCode);
            console.log(discount);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setCartItems([]);
            } else {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    return (
        <React.Fragment>
            <div className="container" style={{ padding: '50px 30px', marginTop: '30px' }}>
                {orderSuccess ? (
                    <>
                        {console.log(orderId)}
                        <OrderSuccess orderId={orderId} />
                    </>
                ) : (
                    <Row>
                        {isLoggedIn ? (
                            cartItems && cartItems.cartItems ? (
                                cartItems.cartItems.length === 0 ? (
                                    <Col md="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', marginTop: '30px', color: '#832729' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <img src={emptycart} alt='Empty Cart' style={{ width: '120px' }} />
                                            <h3 style={{ fontFamily: 'Nunito Sans sans-serif' }}>Your cart is empty </h3>
                                            <Link to="/" ><label className='cart-product-name' style={{ color: '#832729', fontSize: '13px' }} > Continue Shopping </label></Link>
                                        </div>
                                    </Col>
                                ) : (
                                    <React.Fragment>
                                        <Col md="7">
                                            <Suspense fallback={<Loader />}>
                                                <CheckoutSteps setOrderSuccess={setOrderSuccess} setOrderId={setOrderId} couponCode={couponCode} />
                                            </Suspense>
                                        </Col>
                                        <Col md="5">
                                            <Suspense fallback={<Loader />}>
                                                <CheckoutSummary cartItems={cartItems} couponCode={couponCode} discount={discount} />
                                            </Suspense>
                                        </Col>
                                    </React.Fragment>
                                )
                            ) : (
                                <Col md="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', marginTop: '30px', color: '#832729' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={loginfirst} alt='login first' />
                                        <h3 style={{ fontFamily: 'Nunito Sans sans-serif' }}>Please login to view cart items</h3>
                                    </div>
                                </Col>
                            )
                        ) : (
                            <Col md="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', marginTop: '30px', color: '#832729' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={loginfirst} alt='login first' />
                                    <h3 style={{ fontFamily: 'Nunito Sans sans-serif' }}>Please login to view cart items</h3>
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
            </div>
        </React.Fragment>
    );
};

export default Checkout;