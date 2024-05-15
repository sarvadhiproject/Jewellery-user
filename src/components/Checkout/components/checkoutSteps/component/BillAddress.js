import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { IoMdClose } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';
import ApiConfig from '../../../../../config/ApiConfig';

const BillAddress = ({ onStepCompleted }) => {
    const [modal, setModal] = useState(false);
    const [addressDetails, setAddressDetails] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [stateList, setStateList] = useState([]); 
    const [cityList, setCityList] = useState([]); 

    const toggle = () => setModal(!modal);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get(`${ApiConfig.ApiPrefix}/location/states`);
            const formattedStates = response.data.map((state) => ({
                value: state.state_id,
                label: state.state_name,
            }));
            setStateList(formattedStates);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setSelectedCity(null); 
        const stateId = selectedOption.value;
        fetchCities(stateId);
    };

    const fetchCities = async (stateId) => {
        try {
            const response = await axios.get(`${ApiConfig.ApiPrefix}/location/cities/${stateId}`);
            console.log(response.data);
            const formattedCities = response.data.map((city) => ({
                value: city.city_id,
                label: city.city_name,
            }));
            setCityList(formattedCities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleCheckboxChange = async () => {
        try {
            const userId = localStorage.getItem('userId'); 
            const response = await axios.post(`${ApiConfig.ApiPrefix}/update-billing`, {
                user_id: userId
            });
            console.log(response.data);
            setAddressDetails(response.data.data);
            onStepCompleted();
        } catch (error) {
            console.error('Error updating billing address:', error);
        }
    };

const handleSubmit = async (values, { setSubmitting }) => {
    try {
        const userId = localStorage.getItem('userId'); 
        const selectedStateId = selectedState.value;
        const selectedCityId = selectedCity.value;

        const addressData = {
            user_id: userId,
            first_name: values.first_name,
            last_name: values.last_name,
            addressline_1: values.address,
            addressline_2: values.address2,
            city_id: selectedCityId, 
            state_id: selectedStateId, 
            pincode: values.pincode,
            phone_no: values.phone_no,
        };


        const response = await axios.post(`${ApiConfig.ApiPrefix}/add-billing-address`, addressData);

        const bildata = {
            user_id: userId,
            first_name: values.first_name,
            last_name: values.last_name,
            addressline_1: values.address,
            addressline_2: values.address2,
            City: {
                city_name:selectedCity.label,
                state:{
                    state_name:selectedState.label,
                },
            },
            pincode: values.pincode,
            phone_no: values.phone_no,
        };
        setAddressDetails(bildata);
        onStepCompleted();
        console.log(response.data);
        setSubmitting(false);
        toggle();
    } catch (error) {
        console.error("Error adding address:", error);
    }
};

    


    return (
        <>
            <div style={{ padding: '5px 20px' }}>
                {addressDetails ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ fontFamily: 'Nunito Sans', fontSize: '15px', fontWeight: '500' }}>
                                <>{console.log(addressDetails)}</>
                                <div>{addressDetails.first_name} {addressDetails.last_name}</div>
                                <div>{addressDetails.City.city_name}, {addressDetails.City.state.state_name}, {addressDetails.pincode}</div>
                                <div>{addressDetails.phone_no}</div>
                            </div>
                            <Button className='edit-address-btn' onClick={toggle} style={{ height: '40px' }}>Edit</Button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="sameAsShipping"
                                name="sameAsShipping"
                                style={{ width: '20px', height: '20px', accentColor: '#832729', }}
                                onChange={() => {
                                    handleCheckboxChange(); 
                                }} />
                            <label htmlFor="sameAsShipping" style={{ marginLeft: '0.5rem', fontFamily: 'Nunito Sans', fontSize: '15px' }}>Same as Shipping Address</label>
                        </div>
                        <Button className='save-address-btn' onClick={toggle}>Add Address</Button>
                    </div>
                )}
            </div >

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader style={{ justifyContent: 'flex-start', minWidth: '100%', alignItems: 'center', paddingBottom: '10px' }}>
                    <label style={{ color: '#832729', fontSize: '18px', fontFamily: 'Nunito Sans' }}> Add New Address </label>
                    <label style={{ marginLeft: '280px' }}> <IoMdClose style={{ fontSize: '20px', fontWeight: 'bold' }} onClick={toggle} /> </label>
                </ModalHeader>
                <ModalBody style={{ paddingBottom: '0px' }}>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            phone_no: '',
                            address: '',
                            pincode: ''
                        }}
                        validationSchema={Yup.object().shape({
                            first_name: Yup.string().required('First Name is required'),
                            last_name: Yup.string().required('Last Name is required'),
                            phone_no: Yup.string()
                                .required('Phone Number is required')
                                .matches(/^[0-9]+$/, 'Phone Number must be a valid number')
                                .max(10, 'Phone Number must be at most 10 digits'),
                            address: Yup.string().required('Address is required'),
                            pincode: Yup.string()
                                .required('Pincode is required')
                                .max(6, 'Pincode must be at most 6 digits')
                        })}
                        onSubmit={handleSubmit}
                    >

                        {({ isSubmitting }) => (
                            <Form>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                                    <FormGroup>
                                        <label>First Name</label><span style={{ color: 'red' }}> *</span>
                                        <Field type="text" name="first_name" id="first_name" placeholder="" as={Input} />
                                        <ErrorMessage name="first_name" component="div" className="error-message" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Last Name</label><span style={{ color: 'red' }}> *</span>
                                        <Field type="text" name="last_name" id="last_name" placeholder="" as={Input} />
                                        <ErrorMessage name="last_name" component="div" className="error-message" />
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormGroup>
                                        <label>Phone Number</label><span style={{ color: 'red' }}> *</span>
                                        <Field type='number' name='phone_no' placeholder='' as={Input} style={{ fontSize: '13px', width: '80%' }} />
                                        <ErrorMessage name="phone_no" component="div" className="error-message" />
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormGroup>
                                        <label>Address 1</label><span style={{ color: 'red' }}> *</span>
                                        <Field type='text' name='address' placeholder='House No, Building, street, Area' as={Input} style={{ fontSize: '13px' }} />
                                        <ErrorMessage name="address" component="div" className="error-message" />
                                    </FormGroup>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormGroup>
                                        <label>State</label><span style={{ color: 'red' }}> *</span>
                                        <Select
                                            options={stateList}
                                            onChange={handleStateChange}
                                            value={selectedState}
                                            className='selector'
                                        />
                                        <ErrorMessage name="state" component="div" className="error-message" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>City</label><span style={{ color: 'red' }}> *</span>
                                        <Select
                                            options={cityList}
                                            onChange={(selectedOption) => setSelectedCity(selectedOption)}
                                            value={selectedCity}
                                            className='selector'
                                        />
                                        <ErrorMessage name="city" component="div" className="error-message" />
                                    </FormGroup>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormGroup>
                                        <label>Pincode</label><span style={{ color: 'red' }}> *</span>
                                        <Field type='number' name="pincode" placeholder='' as={Input} />
                                        <ErrorMessage name="pincode" component="div" className="error-message" />
                                    </FormGroup>
                                </div>
                                <ModalFooter>
                                    <Button className='save-address-btn' onClick={toggle} disabled={isSubmitting}>Cancel</Button>
                                    <Button className='save-address-btn' type="submit" disabled={isSubmitting}>Save Address</Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal >
        </>
    );
};

export default BillAddress;
