import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import emptyorder from "../../assets/images/emptyorder.svg";
import DetailOrder from './DetailOrder';
import { Link } from 'react-router-dom';
import { TbFileInvoice } from "react-icons/tb";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (accessToken) {
            fetchOrderDetails();
        }
    }, [accessToken]);

    const fetchOrderDetails = async () => {
        try {
            const userid = localStorage.getItem('userId');
            const response = await axios.get(`${ApiConfig.ApiPrefix}/order/${userid}`);
            const ordersWithFormattedDate = response.data.orders.map(orders => ({
                ...orders,
                order_date: new Date(orders.order_date).toLocaleDateString('en-GB'),
            }));
            setOrders(ordersWithFormattedDate);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };


    const handleinvoice = () => {
        console.log("downloading");
    };

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

    return (
        <>
            {!accessToken ? (
                <div>
                    <h3 style={{ fontFamily: 'Nunito Sans' }}>Login to view your order history</h3>
                </div>
            ) : orders.length === 0 ? (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <img src={emptyorder} alt='Empty order' style={{ width: '130px' }} />
                        <h3 style={{ fontFamily: 'Nunito Sans' }}>No Order Placed</h3>
                        <Link to="/" ><label className='cart-product-name' style={{ color: '#832729', fontSize: '13px' }} > Continue Shopping </label></Link>
                    </div>
                </>
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
                                <th className='order-table-head'>Invoice</th>
                                <th className='order-table-head'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #832729' }}>
                                    <td>{order.order_id}</td>
                                    <td>{order.order_date}</td>
                                    <td>{getStatusText(order.status)}</td>
                                    <td>{parseFloat(order.total_amount).toFixed(2)}</td>
                                    <td><TbFileInvoice style={{fontSize:'25px'}} onClick={handleinvoice} /></td>
                                    <td>
                                        <button
                                            style={{ border: 'none', backgroundColor: 'white', color: '#832729', borderBottom: '2px solid #832729', paddingBottom: '0px', fontWeight: '600' }}
                                            onClick={() => {
                                                setSelectedOrderId(order.order_id);
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
