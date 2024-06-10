import React, { useState, useEffect } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import emptyorder from "../../assets/images/emptyorder.svg";
import DetailOrder from './DetailOrder';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { TbFileInvoice } from "react-icons/tb";

const OrderHistory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [orders, setOrders] = useState([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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


    const handleDownloadInvoice = async (orderId) => {
        try {
            const response = await axios.get(`${ApiConfig.ApiPrefix}/invoice/${orderId}/invoice`, {
                responseType: 'blob',
            });

            // Create a URL for the PDF file
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element
            const downloadLink = document.createElement('a');
            downloadLink.href = fileURL;
            downloadLink.download = `invoice_${orderId}.pdf`;

            // Append the anchor element to the document and trigger the click event
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Clean up the temporary anchor element
            document.body.removeChild(downloadLink);

            // Revoke the object URL to free up memory
            window.URL.revokeObjectURL(fileURL);
        } catch (error) {
            console.error('Error downloading invoice:', error);
            enqueueSnackbar('Failed to download, try again later', { variant: 'error' });
        }
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

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PaginationItem key={i} active={i === currentPage}>
                    <PaginationLink onClick={() => handlePageChange(i)} style={{ backgroundColor: '#832729', fontSize: '12px', borderColor: 'white', color: 'white' }}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pageNumbers;
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
                    <Table style={{ marginBottom: "8px" }}>
                        <thead style={{ backgroundColor: '#F2E9E9' }}>
                            <tr>
                                <th className='order-table-head'>#</th>
                                <th className='order-table-head'>Order Number</th>
                                <th className='order-table-head'>Order Date</th>
                                <th className='order-table-head'>Order Status</th>
                                <th className='order-table-head'>Total Price</th>
                                <th className='order-table-head'>Invoice</th>
                                <th className='order-table-head'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #832729' }}>
                                    <td>{indexOfFirstOrder + index + 1}</td>
                                    <td>{order.order_id}</td>
                                    <td>{order.order_date}</td>
                                    <td>{getStatusText(order.status)}</td>
                                    <td>{parseFloat(order.total_amount).toFixed(2)}</td>
                                    <td><TbFileInvoice style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => handleDownloadInvoice(order.order_id)} /></td>
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
                    <div style={{ textAlign: 'right' }}>
                        <Pagination aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
                            {renderPagination()}
                        </Pagination>
                    </div>
                </>
            ) : (
                <DetailOrder orderId={selectedOrderId} />
            )}
        </>
    );
};

export default OrderHistory;
