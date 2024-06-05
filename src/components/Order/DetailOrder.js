import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Table, Col, CardImg } from 'reactstrap';
// import { VscSync } from "react-icons/vsc";
import { BsBagCheckFill } from "react-icons/bs";
import ApiConfig from '../../config/ApiConfig';

const DetailOrder = ({ orderId }) => {
  const [order, setOrder] = useState(null);

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
        return 'Unknown Status';
    }
  };

  const subtotal = order.orderItems.reduce((total, item) => total + parseFloat(item.sub_total), 0);
  const gstAmount = (subtotal * 0.03).toFixed(2);
  const totalWithGST = (parseFloat(subtotal) + parseFloat(gstAmount)).toFixed(2);

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
                <Col xs='4'>
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
            </Card>
          ))}
          <hr style={{ margin: '0px', marginBottom: '8px' }}></hr>
          <div style={{ position: 'relative', left: '80%' }}>
            Total Price: <strong> ₹{order.orderItems.reduce((total, item) => total + parseFloat(item.sub_total), 0)}</strong>
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
              <td><strong>₹0</strong></td>
            </tr>
            <tr>
              <td>GST</td>
              <td><strong>₹{gstAmount}</strong></td>
            </tr>
            <tr>
              <td>Total</td>
              <td><strong>₹{totalWithGST}</strong></td>
            </tr>
          </tbody>
        </Table>
      </div>

    </div>
  );
};

export default DetailOrder;
