import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import ApiConfig from '../../../../config/ApiConfig';

const EditUser = ({ isOpen, toggle, userProfile, onSave }) => {
    const { enqueueSnackbar } = useSnackbar();

    if (!userProfile) {
        return null;
    }

    const initialValues = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.put(`${ApiConfig.ApiPrefix}/auth/update/`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                toggle();
                enqueueSnackbar('User details updated Successfully', { variant: 'success' });
                onSave();
            }
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Failed to update details, try again later', { variant: 'error' });
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} style={{ left: '250px' }}>
            <ModalHeader style={{ marginTop: '8px', paddingTop: '8px', border: 'none', paddingBottom: '2px', marginBottom: '0px' }}>
                <span style={{ fontSize: 18, color: '#832729' }}>Edit User Details</span>
            </ModalHeader>
            <ModalBody>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Field type="text" name="first_name" id="firstName" className="form-control" />
                                <ErrorMessage name="first_name" component="div" className="text-danger" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Field type="text" name="last_name" id="lastName" className="form-control" />
                                <ErrorMessage name="last_name" component="div" className="text-danger" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email Address</Label>
                                <Field type="email" name="email" id="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone Number</Label>
                                <Input type="text" name="phoneno" id="phone" value={userProfile.phone_no} className="form-control" readOnly style={{ backgroundColor: '#f0f0f0' }} />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="submit" style={{ backgroundColor: '#832729', borderColor: '#832729' }} disabled={!(isValid && dirty)}>Save Changes</Button>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default EditUser;
