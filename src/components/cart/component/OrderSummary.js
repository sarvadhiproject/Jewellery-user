import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidCoupon } from "react-icons/bi";
import { Card, CardBody, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ApiConfig from '../../../config/ApiConfig';

const CouponCard = ({ coupon, onApply }) => {
    const handleApply = () => {
        onApply(coupon);
    };

    const discountMessage = () => {
        if (coupon.discount_type === 'Percentage') {
            return `Extra ${coupon.discount_value}% Off`;
        } else if (coupon.discount_type === 'Fixed Value') {
            return `Extra ₹${coupon.discount_value} Off`;
        }
    };

    return (
        <>
            <DropdownItem className='coupon-card'>
                <div style={{ flex: 1 }}>
                    <strong>{coupon.code}</strong>
                    <div style={{ fontSize: '13px' }}>{discountMessage()}</div>
                </div>
                <Button className='apply-btn' onClick={handleApply}>
                    Apply
                </Button>
            </DropdownItem>
            <hr style={{ margin: '0.5rem 0' }}></hr>
        </>
    );
};

const OrderSummary = ({ cartItems }) => {
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout');
    };
    const subTotal = cartItems.total;
    const gstAmount = (subTotal * 0.03).toFixed(2);
    const total = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);

    const [applicableCoupons, setApplicableCoupons] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleApplyCoupon = (coupon) => {
        console.log('Applying coupon:', coupon);
    };

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        const fetchApplicableCoupons = async () => {
            try {
                const cartId = cartItems.cartItems[0]?.cart_id;
                if (cartId) {
                    const response = await axios.get(`${ApiConfig.ApiPrefix}/coupon/carts/${cartId}/applicable-coupons`);
                    console.log('coupon data', response.data);
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

                <div style={{ marginTop: '60px', marginBottom: '20px' }}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                        <DropdownToggle caret className='coupon-input'>Enter Coupon Code</DropdownToggle>
                        <DropdownMenu style={{ width: '100%', borderRadius: '0px', paddingBottom: '0%', maxHeight: '160px', overflowY: 'auto' }}>
                            {applicableCoupons.length > 0 ? (
                                applicableCoupons.map((coupon) => (
                                    <CouponCard key={coupon.id} coupon={coupon} onApply={handleApplyCoupon} />
                                ))
                            ) : (
                                <div style={{textAlign:'center', padding:'10px', color:'#832729'}}>
                                    <BiSolidCoupon style={{fontSize:'35px'}} /><br></br>
                                    <strong style={{fontFamily:'Nunito Sans'}}>No coupon available</strong>
                                </div>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div style={{ padding: '2px 5px' }}>
                    <Button style={{ borderRadius: '5px', backgroundColor: '#832729', width: '100%' }} onClick={handleCheckout}>
                        Checkout
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default OrderSummary;