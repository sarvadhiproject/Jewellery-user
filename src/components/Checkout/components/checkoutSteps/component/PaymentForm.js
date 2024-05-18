import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Button, Card, CardBody, Spinner } from 'reactstrap';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import ApiConfig from '../../../../../config/ApiConfig';

const PaymentForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [cardDetails, setcardDetails] = useState(null);
    const toggle = () => setModal(!modal);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (values, { setSubmitting }) => {
        setcardDetails(values);
        setSubmitting(false);
        toggle();
    };

    const placeOrder = async () => {
        setIsLoading(true);
        try {
            console.log('calling api');
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error("Customer ID not found in local storage.");
                return;
            }

            const response = await axios.post(`${ApiConfig.ApiPrefix}/order/add`, {
                user_id: userId,
            });

            if (response.status === 201) {
                console.log("Order placed successfully:", response.data);
                enqueueSnackbar("Order placed successfully", { variant: 'success' });
                props.setOrderSuccess(true);
                props.setOrderId(response.data.order.ordertracking_id);
            }
            console.log("Response message:", response.data.message);



        } catch (error) {
            console.error("Failed to place order:", error);
            enqueueSnackbar("Failed to place order", { variant: 'error' });
            console.log("Error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{ padding: '5px 20px' }}>
                {cardDetails ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ fontFamily: 'Nunito Sans', fontSize: '15px', fontWeight: '500' }}>

                            </div>
                            <Button className='edit-address-btn' onClick={toggle} style={{ height: '40px' }}>Edit</Button>
                        </div>
                    </>
                ) : (
                    <Card>
                        <CardBody style={{ fontWeight: '600', fontFamily: 'Nunito Sans' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label>No Saved Card</label>
                                <Button className='save-address-btn' onClick={toggle}>Add Card</Button>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div >
            <div style={{ textAlign: 'center', margin: '30px 0px' }}>
                <Button className='product-details-cart-btn' style={{ width: '85%' }} onClick={placeOrder} disabled={isLoading}>
                    {isLoading ? <Spinner size='sm' color="light" /> : 'Place Order'}
                </Button>
            </div>


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader style={{ justifyContent: 'flex-start', minWidth: '100%', alignItems: 'center', paddingBottom: '10px' }}>
                    <label style={{ color: '#832729', fontSize: '18px', fontFamily: 'Nunito Sans' }}> Add Card Details </label>
                    <label style={{ marginLeft: '280px' }}> <IoMdClose style={{ fontSize: '20px', fontWeight: 'bold' }} onClick={toggle} /> </label>
                </ModalHeader>
                <ModalBody style={{ paddingBottom: '0px' }}>
                    <Formik
                        initialValues={{ cardname: '', cardNumber: '', expiryDate: '', cvv: '' }}
                        validationSchema={Yup.object().shape({
                            cardname: Yup.string().required('Name is required'),
                            cardNumber: Yup.string().required('Card number is required'),
                            expiryDate: Yup.string().required('Expiry date is required'),
                            cvv: Yup.string().required('CVV is required')
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormGroup>
                                    <label>Name on Card</label><span style={{ color: 'red' }}> *</span>
                                    <Field type="text" name="cardname" id="cardname" placeholder="Name on Card" as={Input} />
                                    <ErrorMessage name="cardname" component="div" className="error-message" />
                                </FormGroup>
                                <FormGroup>
                                    <label>Card Number</label><span style={{ color: 'red' }}> *</span>
                                    <Field type="text" name="cardNumber" id="cardNumber" placeholder="Enter Card Number" as={Input} />
                                    <ErrorMessage name="cardNumber" component="div" className="error-message" />
                                </FormGroup>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                                    <FormGroup>
                                        <label>Expiry Date</label><span style={{ color: 'red' }}> *</span>
                                        <Field type='text' name="expiryDate" placeholder='MM/YY' as={Input} />
                                        <ErrorMessage name="expiryDate" component="div" className="error-message" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>CVV</label><span style={{ color: 'red' }}> *</span>
                                        <Field type='text' name='cvv' placeholder='Enter CVV' as={Input} />
                                        <ErrorMessage name="cvv" component="div" className="error-message" />
                                    </FormGroup>
                                </div>
                                <ModalFooter>
                                    <Button className='save-address-btn' onClick={toggle} disabled={isSubmitting}>Cancel</Button>
                                    <Button className='save-address-btn' type="submit" disabled={isSubmitting}>Save Card</Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default PaymentForm;
