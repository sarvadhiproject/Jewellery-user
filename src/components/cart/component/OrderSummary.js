// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';


// const OrderSummary = ({ cartItems }) => {
//     const navigate = useNavigate();
//     const handleCheckout = () => {
//         navigate('/checkout');
//     };

//     const subTotal = cartItems.total
//     const gstAmount = (subTotal * 0.03).toFixed(2);
//     const total = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);
//     return (
//         <Card style={{ border: 'none', padding: '10px', width: '400px' }}>
//             <CardBody style={{ padding: '0px 15px' }}>
//                 <h4 style={{ fontFamily: 'Nunito Sans', color: '#832729', marginBottom: '15px' }}>ORDER SUMMARY</h4>
//                 <div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
//                         <label>Sub Total  </label>
//                         <label>₹{subTotal}</label>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
//                         <label>Discount  </label>
//                         <label>₹ 0</label>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
//                         <label>GST  </label>
//                         <label>₹ {gstAmount}</label>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
//                         <label>Delivery Charge</label>
//                         <label>Free</label>
//                     </div>
//                     <hr />
//                     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 5px', fontFamily: 'Nunito Sans', fontSize: '16px', fontWeight: '600' }}>
//                         <label>Total </label>
//                         <label>₹ {total}</label>
//                     </div>
//                 </div>

//                 <Form style={{ marginTop: '70px', display: 'flex', justifyContent: 'space-evenly' }}>
//                     <FormGroup>
//                         <Input type="text" id="couponCode" placeholder="Enter Coupon Code" />
//                     </FormGroup>
//                     <Button style={{ borderRadius: '5px', backgroundColor: '#832729', marginLeft: '10px', height: '43px', width: '90px', padding: '10px 15px', fontSize: '15px' }}>Apply</Button>
//                 </Form>
//                 <div style={{ padding: '2px 5px' }}>
//                     <Button style={{ borderRadius: '5px', backgroundColor: '#832729', width: '100%' }} onClick={handleCheckout}> Checkout </Button>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// };

// export default OrderSummary;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
import ApiConfig from '../../../config/ApiConfig';


const OrderSummary = ({ cartItems }) => {
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout');
    };
    const subTotal = cartItems.total
    const gstAmount = (subTotal * 0.03).toFixed(2);
    const total = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);

    const [applicableCoupons, setApplicableCoupons] = useState([]);
    console.log(cartItems);
    useEffect(() => {
        const fetchApplicableCoupons = async () => {
            try {
                const cartId = cartItems.cartItems[0]?.cart_id; // Extract the cart_id from the first cartItem
                if (cartId) {
                    const response = await axios.get(`${ApiConfig.ApiPrefix}/coupon/carts/${cartId}/applicable-coupons`);
                    console.log(response.data);
                    setApplicableCoupons(response.data);
                } else {
                    console.error('Cart ID not found');
                }
            } catch (error) {
                console.error('Error fetching applicable coupons:', error);
            }
        };

        fetchApplicableCoupons();
    }, [cartItems]);

    return (
        <Card style={{ border: 'none', padding: '10px', width: '400px' }}>
            <CardBody style={{ padding: '0px 15px' }}>
                <h4 style={{ fontFamily: 'Nunito Sans', color: '#832729', marginBottom: '15px' }}>ORDER SUMMARY</h4>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                        <label>Sub Total  </label>
                        <label>₹{subTotal}</label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                        <label>Discount  </label>
                        <label>₹ 0</label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                        <label>GST  </label>
                        <label>₹ {gstAmount}</label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                        <label>Delivery Charge</label>
                        <label>Free</label>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 5px', fontFamily: 'Nunito Sans', fontSize: '16px', fontWeight: '600' }}>
                        <label>Total </label>
                        <label>₹ {total}</label>
                    </div>
                </div>

                <Form style={{ marginTop: '70px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <FormGroup>
                        <Input type="text" id="couponCode" placeholder="Enter Coupon Code" list="couponList" />
                        <datalist id="couponList">
                            {applicableCoupons.map((coupon) => (
                                <option key={coupon.id} value={coupon.code}>
                                    {coupon.code} ({coupon.vendor.first_name} {coupon.vendor.last_name})
                                </option>
                            ))}
                        </datalist>
                    </FormGroup>
                    <Button style={{ borderRadius: '5px', backgroundColor: '#832729', marginLeft: '10px', height: '43px', width: '90px', padding: '10px 15px', fontSize: '15px' }}>Apply</Button>
                </Form>
                <div style={{ padding: '2px 5px' }}>
                    <Button style={{ borderRadius: '5px', backgroundColor: '#832729', width: '100%' }} onClick={handleCheckout}> Checkout </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default OrderSummary;