    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';


    const OrderSummary = ({ cartItems }) => {
        console.log(cartItems);
        const firstCartItem = cartItems.cartItems.length > 0 ? cartItems.cartItems[0] : {};
        const navigate = useNavigate();
        const handleCheckout = () => {
            navigate('/checkout');
        };
        return (
            <Card style={{ border: 'none', padding: '10px', width: '400px' }}>
                <CardBody style={{ padding: '0px 15px' }}>
                    <h4 style={{ fontFamily: 'Nunito Sans', color: '#832729', marginBottom: '15px' }}>ORDER SUMMARY</h4>
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

                    <Form style={{ marginTop: '70px', display: 'flex', justifyContent: 'space-evenly' }}>
                        <FormGroup>
                            <Input type="text" id="couponCode" placeholder="Enter Coupon Code" />
                        </FormGroup>
                        <Button style={{ borderRadius: '5px', backgroundColor: '#832729', marginLeft: '10px', height: '43px', width: '90px', padding: '10px 15px', fontSize: '15px' }}>Apply</Button>
                    </Form>
                    <div style={{padding: '2px 5px'}}>
                        <Button style={{ borderRadius: '5px', backgroundColor: '#832729', width: '100%' }} onClick={handleCheckout}> Checkout </Button>
                    </div>
                </CardBody>
            </Card>
        );
    };

    export default OrderSummary;