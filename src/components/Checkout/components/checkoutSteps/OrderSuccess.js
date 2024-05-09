import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import success from '../../../../assets/images/ordersuccess.gif';

const OrderSuccess = ({ orderId }) => {
    const navigate = useNavigate();
    const handlevieworder = () => {
        console.log("Wishlist icon clicked");
        navigate('/account?activeComponent=orderHistory');
      };
    return (
        <div style={{ textAlign: 'center', padding: '40px 30px' }}>
            <div style={{backgroundColor:'transparent'}}>
            <img src={success} alt="Order Success GIF" style={{ width: '220px'}} />
            </div>
                
            <h2 style={{ color: '#832729', fontFamily: 'Nunito Sans' }}>Order Placed Successfully</h2>
            <p>Your Order Number is: {orderId}</p>
            <Button className='order-success' onClick={handlevieworder}>View Order Details</Button>
        </div>
    );
};

export default OrderSuccess;