import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import DetailOrder from './DetailOrder';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (accessToken) {
            fetchOrderDetails();
        }
    }, []);

    const fetchOrderDetails = async () => {
        try {
            const userid = localStorage.getItem('userId');
            const response = await axios.get(`${ApiConfig.ApiPrefix}/order-details/${userid}`);
            const ordersWithFormattedDate = response.data.map(order => ({
                ...order,
                order_date: new Date(order.order_date).toLocaleDateString('en-GB'),
            }));
            setOrders(ordersWithFormattedDate);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    return (
        <>
            {!accessToken ? (
                <div>
                    <h3 style={{ fontFamily: 'Nunito Sans' }}>Login to view your order history</h3>
                </div>
            ) : !showOrderDetails ? (
                <>
                    <h2 style={{ fontFamily: 'Nunito Sans', padding: '10px 0px' }}>Placed Order</h2>
                    <Table>
                        <thead style={{ backgroundColor: '#F2E9E9' }}>
                            <tr>
                                <th className='order-table-head'>Order Number</th>
                                <th className='order-table-head'>Order Date</th>
                                <th className='order-table-head'>Order Status</th>
                                <th className='order-table-head'>Total Price</th>
                                <th className='order-table-head'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #832729' }}>
                                    <td>{order.ordertracking_id}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.status}</td>
                                    <td>{order.total_amount}</td>
                                    <td>
                                        <button
                                            style={{ border: 'none', backgroundColor: 'white', color: '#832729', borderBottom: '2px solid #832729', paddingBottom: '0px', fontWeight: '600' }}
                                            onClick={() => {
                                                setSelectedOrderId(order.ordertracking_id);
                                                setShowOrderDetails(true);
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : (
                <DetailOrder orderId={selectedOrderId} />
            )}
        </>
    );
};

export default OrderHistory;
