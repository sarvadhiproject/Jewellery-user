import React from 'react';
import ApiConfig from '../../../config/ApiConfig';
import { Card, CardImg, CardBody, Row, Col, Container } from 'reactstrap';


const CheckoutSummary = ({ cartItems }) => {
    const firstCartItem = cartItems.cartItems.length > 0 ? cartItems.cartItems[0] : {};
    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ border: 'none', padding: '10px', width: '400px' }}>
                        <CardBody style={{ padding: '0px 15px' }}>
                            <h4 style={{ fontFamily: 'Nunito Sans', color: '#832729', marginBottom: '15px' }}>Order Summary</h4>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                                    <label>Sub Total  </label>
                                    <label>₹{firstCartItem.total}</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                                    <label>Discount  </label>
                                    <label>₹ 0</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                                    <label>GST  </label>
                                    <label>₹ {cartItems.totalGST}</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                                    <label>Delivery Charge</label>
                                    <label>Free</label>
                                </div>
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 5px', fontFamily: 'Nunito Sans', fontSize: '16px', fontWeight: '600' }}>
                                    <label>Total </label>
                                    <label>₹ {cartItems.grandTotal}</label>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col style={{ paddingLeft: '50px' }}>
                    {cartItems.cartItems.map((cartItem) => (
                        <Card key={cartItem.product_id} className="mb-3" style={{ width: '90%' }}>
                            <Row>
                                <Col lg='3'>
                                    <CardImg src={`${ApiConfig.cloudprefix}${cartItem.product.p_images[0]}`} alt={cartItem.product.product_name} style={{ height: '90px', width: '90px', padding: '10px', borderRadius: '20px' }} />
                                </Col>
                                <Col lg='9'>
                                    <CardBody style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', color: '#832729', justifyContent: 'space-between', alignItems: 'center', marginTop: '7px' }}>
                                                <label className='cart-product-name' style={{ fontSize: '13px' }}>{cartItem.product.product_name}</label>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <label style={{ fontSize: '12px', fontWeight: '600', marginTop: '5px' }}>Qty: {cartItem.quantity}</label>
                                                {cartItem.size && (
                                                    <label style={{ fontSize: '12px', fontWeight: '600', marginTop: '5px' }}> | Size: {cartItem.size}</label>
                                                )}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutSummary;