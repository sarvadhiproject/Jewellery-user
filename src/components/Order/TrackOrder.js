import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import 'antd/dist/reset.css';
import { FaCheckCircle } from 'react-icons/fa';
import { Card, CardBody, Row, Col, CardImg, Input, Button } from 'reactstrap';
import ApiConfig from '../../config/ApiConfig';
import axios from 'axios';

const { Step } = Steps;

const TrackOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [Order, setOrder] = useState(null);
  const [orderIdError, setOrderIdError] = useState('');

  const validateOrderId = () => {
    if (orderId.trim() === '') {
      setOrderIdError('Please enter an order ID');
      return false;
    } else {
      setOrderIdError('');
      return true;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const statusMap = {
    1: 'Order Placed',
    2: 'Processing',
    3: 'Shipped',
    4: 'Out for Delivery',
    5: 'Delivered',
  };

  const statusDescriptions = {
    'Order Placed': () => formatDate(Order.order.order_date),
    'Processing': () => formatDate(Order.order.processing),
    'Shipped': () => formatDate(Order.order.shipped),
    'Out for Delivery': () => formatDate(Order.order.out_for_delivery),
    'Delivered': () => formatDate(Order.order.delivered),
  };

  const fetchOrderDetails = async () => {
    if (validateOrderId()) {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${ApiConfig.ApiPrefix}/order/detailed/${userId}/${orderId}`);
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }
  };

  useEffect(() => {
    if (Order) { 
      const statusOrder = Object.values(statusMap);
      const textStatus = statusMap[Order.order.status];
      const stepIndex = statusOrder.indexOf(textStatus);
      setCurrentStep(stepIndex);
    }
  }, [Order]);


  const customDot = (dot, { status, index }) => {
    if (status === 'finish'){
      return <FaCheckCircle className='check-icon' />;
    }
    else if (status === 'process') {
      if (Order.order.status === 1 || Order.order.status === 5) {
        return <FaCheckCircle className='check-icon' />;
      }
      else {
        return <div style={{ backgroundColor: '#832729', borderRadius: '50%', width: '15px', height: '15px' }} />;
      }
    }
    return dot;
  };

  return (
    <>
      {!Order ? (
        <div style={{ padding: '12px 20px' }}>

          <div style={{ fontFamily: 'Nunito Sans', textAlign: 'center' }}>
            <h3 style={{ fontWeight: '600' }}>Track your Order</h3>
            <p>Gain insight into your order's status. Enter your Order ID to proceed </p>
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              style={{ width: '60%' }}
              onChange={(e) => setOrderId(e.target.value)}
              invalid={!!orderIdError}
            />
            <Button onClick={fetchOrderDetails} className='track-btn'>
              Track Order
            </Button>
          </div>
            {orderIdError && <div style={{ color: 'red' , paddingLeft:'70px'}}>{orderIdError}</div>}
        </div>
      ) : (
        <>
          <div className="order-info" style={{ padding: '12px 20px' }}>
            <div>
              <strong>Order ID: {Order.order.order_id} </strong>
            </div>
            <div>
              <strong>Total Amount: ₹{Order.order.total_amount}</strong>
            </div>
          </div>

          <Card style={{}}>
            <CardBody>
              <Row>
                <div style={{ padding: '15px', paddingTop: '0px', color: '#832729', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold' }}><p>Track the Order</p></div>
                <Col md={12}>
                  <Steps progressDot={customDot} current={currentStep} >
                    {Object.entries(statusMap).map(([statusValue, statusText], index) => (
                      <Step
                        key={index}
                        title={statusText}
                        status={index < currentStep ? 'finish' : index === currentStep ? 'process' : 'wait'}
                        description={statusDescriptions[statusText] ? statusDescriptions[statusText]() : ''}
                      />
                    ))}
                  </Steps>
                </Col>
              </Row>

              <Row style={{ marginTop: '80px' }}>
                <div style={{ padding: '0px 15px', color: '#832729', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold' }}> <p>Delivery Details</p> </div>
                <Col md={6}>
                  <Card style={{ backgroundColor: '#F2E9E9', border: 'none' }}>
                    <CardBody style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
                      <h4 style={{ color: '#832729' }}>Shipping Address</h4>
                      <div>{Order.shippingAddresses[0].first_name} {Order.shippingAddresses[0].last_name}</div>
                      <div>{Order.shippingAddresses[0].street_address}</div>
                      <div>{Order.shippingAddresses[0].city.city_name}, {Order.shippingAddresses[0].state.state_name}, {Order.shippingAddresses[0].pincode}</div>
                      <div>{Order.shippingAddresses[0].phone_no}</div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card style={{ backgroundColor: '#F2E9E9', border: 'none' }}>
                    <CardBody style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
                      <h4 style={{ color: '#832729' }}>Billing Address</h4>
                      {Order.billingAddresses ? (
                        <>
                          <div>{Order.billingAddresses[0].first_name} {Order.billingAddresses[0].last_name}</div>
                          <div>{Order.billingAddresses[0].street_address}</div>
                          <div>{Order.billingAddresses[0].city.city_name}, {Order.billingAddresses[0].state.state_name}, {Order.billingAddresses[0].pincode}</div>
                          <div>{Order.billingAddresses[0].phone_no}</div>
                        </>
                      ) : (
                        <>
                          <div>{Order.shippingAddresses[0].first_name} {Order.shippingAddresses[0].last_name}</div>
                          <div>{Order.shippingAddresses[0].street_address}</div>
                          <div>{Order.shippingAddresses[0].city.city_name}, {Order.shippingAddresses[0].state.state_name}, {Order.shippingAddresses[0].pincode}</div>
                          <div>{Order.shippingAddresses[0].phone_no}</div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <div style={{ border: '1px solid #D3D3D3', borderRadius: '5px', marginTop: '30px' }}>
            <div className='product-order'>
              <strong>Inside the Box:</strong>
              <div style={{ marginRight: '15px' }}>
              </div>
            </div>
            <div style={{ padding: '0px 15px', paddingTop: '2px' }}>
              {Order.order.orderItems.map((orderItem, index) => (
                <Card style={{ height: '90px', border: 'none' }} key={index}>
                  <Row>
                    <Col xs='2' style={{ width: '10.66667%' }}>
                      <CardImg src={`${ApiConfig.cloudprefix}${orderItem.product.p_images[0]}`} alt={orderItem.product.product_name} style={{ height: '70px', width: '70px' }} />
                    </Col>
                    <Col xs='5' style={{ width: '44.6678%' }}>
                      <div>
                        <strong>{orderItem.product.product_name}</strong>
                        <div style={{ marginTop: '8px' }}> Qty: <strong>{orderItem.quantity}</strong></div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TrackOrder;



