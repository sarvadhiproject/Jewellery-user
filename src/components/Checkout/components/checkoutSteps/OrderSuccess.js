import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import success from '../../../../assets/images/ordersuccess.gif';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const userId = searchParams.get('user_id');
  const localUserId = localStorage.getItem('userId');


  // If sessionId and userId are not present in the URL, redirect to a different page
  if (!sessionId || !userId || userId !== localUserId) {
    return <Navigate to="/404" />;
  }

  const handleViewOrder = () => {
    console.log("View Order icon clicked");
    navigate('/account?activeComponent=orderHistory');
  };

  return (
    <div style={{ textAlign: 'center', padding: '80px 30px' }}>
      <div style={{ backgroundColor: 'transparent' }}>
        <img src={success} alt="Order Success GIF" style={{ width: '220px' }} />
      </div>
      <h2 style={{ color: '#832729', fontFamily: 'Nunito Sans sans-serif' }}>Order Placed Successfully</h2>
      <Button className='order-success' onClick={handleViewOrder}>View Order Details</Button>
    </div>
  );
};

export default OrderSuccess;