import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Table, Col, CardImg } from 'reactstrap';
import { VscSync } from "react-icons/vsc";
import ApiConfig from '../../config/ApiConfig';

const DetailOrder = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const userid = localStorage.getItem('userId');
      const response = await axios.get(`${ApiConfig.ApiPrefix}/detailed-order-details/${userid}/${orderId}`);
      console.log(response.data);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-order-container" style={{ marginTop: '20px' }}>
      <div className="order-info">
        <div>
          <strong>Order ID: {order.ordertracking_id} </strong>
        </div>
        <div>
          <strong>Date: {new Date(order.order_date).toLocaleDateString('en-GB')} </strong>
        </div>
        <div>
          <strong>Total Amount: ₹{order.total_amount}</strong>
        </div>
      </div>

      <div style={{ border: '1px solid  #D3D3D3', borderRadius: '5px' }}>
        <div className='order-item'>
          <strong>Ordered Items: </strong>
          <div style={{ marginRight: '15px' }}>
            <VscSync style={{ color: '#832729', fontWeight: 'bold' }} />
            <strong style={{ color: 'green', fontSize: '15px', marginLeft: '4px' }}>{order.status}</strong>
          </div>
        </div>
        <div style={{ padding: '15px' }}>
          {order.OrderItems.map((orderItem, index) => (
            <Card style={{ height: '120px', border: 'none' }} key={orderItem.order_id}>
              <Row>
                <Col xs='2'>
                  <CardImg src={`${ApiConfig.cloudprefix}${orderItem.Product.p_images[0]}`} alt={orderItem.Product.product_name} style={{ height: '100px', width: '100px' }} />
                </Col>
                <Col xs='4'>
                  <div>
                    <strong>{orderItem.Product.product_name}</strong>
                    <div style={{ marginTop: '8px' }}> Qty: <strong>{orderItem.quantity}</strong></div>
                  </div>
                </Col>
                <Col xs='6'>
                  <div style={{ position: 'relative', left: '260px', paddingRight: '5px' }}>
                    <div>Item Price: <strong>₹{orderItem.sub_total}</strong></div>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
          <hr style={{ margin: '0px', marginBottom: '8px' }}></hr>
          <div style={{ position: 'relative', left: '80%' }}>
            Total Price: <strong> ₹{order.OrderItems.reduce((total, item) => total + parseFloat(item.sub_total), 0)}</strong>
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
              <td><strong>₹{order.OrderItems.reduce((total, item) => total + parseFloat(item.sub_total), 0)}</strong></td>
            </tr>
            <tr>
              <td>Discount</td>
              <td><strong>₹0</strong></td>
            </tr>
            <tr>
              <td>GST</td>
              <td><strong>{parseFloat(order.OrderItems[0].cgst) + parseFloat(order.OrderItems[0].sgst) + parseFloat(order.OrderItems[0].igst)} %</strong></td>
            </tr>
            <tr>
              <td>Total</td>
              <td><strong>₹{order.total_amount}</strong></td>
            </tr>
          </tbody>
        </Table>
      </div>

    </div>
  );
};

export default DetailOrder;
