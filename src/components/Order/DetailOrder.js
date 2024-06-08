import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Table, Col, CardImg } from 'reactstrap';
import Rating from 'react-rating-stars-component';
import { BsBagCheckFill } from "react-icons/bs";
import ApiConfig from '../../config/ApiConfig';
import ReviewModal from '../review/ReviewModal';

const DetailOrder = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const userid = localStorage.getItem('userId');
      const response = await axios.get(`${ApiConfig.ApiPrefix}/order/detailed/${userid}/${orderId}`);
      console.log(response.data);
      setOrder(response.data.order);
      const Subtotal = order.orderItems.reduce((total, item) => total + parseFloat(item.sub_total))
      console.log(Subtotal);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleRatingChange = (newRating, productId) => {
    toggleModal(productId, newRating);
  };

  const toggleModal = (productId = null, rating = 0) => {
    setSelectedProduct(productId);
    setInitialRating(rating);
    setModal(!modal);
  };

  if (!order) {
    return <div>Loading...</div>;
  }


  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Order Placed';
      case 2:
        return 'Processing';
      case 3:
        return 'Shipped';
      case 4:
        return 'Out for Delivery';
      case 5:
        return 'Delivered';
      default:
        return 'Order Placed';
    }
  };

  const subtotal = order.orderItems.reduce((total, item) => total + parseFloat(item.sub_total), 0);
  const gstAmount = (order.discounted_amount * 0.03).toFixed(2);

  return (
    <div className="detail-order-container" style={{ marginTop: '20px' }}>
      <div className="order-info">
        <div>
          <strong>Order ID: {order.order_id} </strong>
        </div>
        <div>
          <strong>Date: {new Date(order.order_date).toLocaleDateString('en-GB')} </strong>
        </div>
        <div>
          <strong>Total Amount: ₹{parseFloat(order.total_amount).toFixed(2)}</strong>
        </div>
      </div>

      <div style={{ border: '1px solid  #D3D3D3', borderRadius: '5px' }}>
        <div className='order-item'>
          <strong>Ordered Items: </strong>
          <div style={{ marginRight: '15px' }}>
            <BsBagCheckFill style={{ color: '#832729', fontWeight: 'bold' }} />
            <strong style={{ color: 'green', fontSize: '15px', marginLeft: '4px' }}>{getStatusText(order.status)}</strong>
          </div>
        </div>
        <div style={{ padding: '15px' }}>
          {order.orderItems.map((orderItem, index) => (
            <Card style={{ height: '120px', border: 'none' }} key={orderItem.order_id}>
              <Row>
                <Col xs='2'>
                  <CardImg src={`${ApiConfig.cloudprefix}${orderItem.product.p_images[0]}`} alt={orderItem.product.product_name} style={{ height: '100px', width: '100px' }} />
                </Col>
                <Col>
                  <Row>
                    <Col xs='5'>
                      <div>
                        <strong>{orderItem.product.product_name}</strong>
                        <div style={{ marginTop: '8px' }}> Qty: <strong>{orderItem.quantity}</strong></div>
                      </div>
                    </Col>
                    <Col xs='6'>
                      <div style={{ position: 'relative', left: '260px', paddingRight: '5px' }}>
                        <div>Item Price: <strong>₹{parseFloat(orderItem.sub_total).toFixed(2)}</strong></div>
                      </div>
                    </Col>
                  </Row>
                  {order.status === 5 && (
                    <Row>
                      <div style={{ display: 'flex' }}>
                        <Rating
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          onChange={(newRating) => handleRatingChange(newRating, orderItem.product_id)}
                        />
                        <label style={{ marginLeft: '15px', position: 'relative', top: '10px', fontFamily: 'Nunito Sans', color: '#872329', fontWeight: '600' }}>Rate the Product</label>
                      </div>
                    </Row>
                  )}
                </Col>

              </Row>

            </Card>
          ))}
          <hr style={{ margin: '0px', marginBottom: '8px' }}></hr>
          <div style={{ position: 'relative', left: '80%' }}>
            Total Price: <strong> ₹{subtotal}</strong>
          </div>
        </div>
      </div>

      <div style={{ padding: '5px', margin: '15px 5px' }}>
        <Table bordered style={{ borderColor: '#832729', width: '370px' }}>
          <thead>
            <tr>
              <th colSpan="2" style={{ textAlign: 'center', backgroundColor: '#F2E9E9', color: '#832729' }}>Price Breakdown</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td><strong>₹{subtotal}</strong></td>
            </tr>
            <tr>
              <td>Discount</td>
              <td><strong>₹{order.discount_value || 0}</strong></td>
            </tr>
            <tr>
              <td>GST</td>
              <td><strong>₹{gstAmount}</strong></td>
            </tr>
            <tr>
              <td>Total</td>
              <td><strong>₹{order.total_amount}</strong></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <ReviewModal
        isOpen={modal}
        toggle={toggleModal}
        productId={selectedProduct}
        initialRating={initialRating}
      />
    </div>
  );
};

export default DetailOrder;