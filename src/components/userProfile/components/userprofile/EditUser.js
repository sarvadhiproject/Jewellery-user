import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ApiConfig from '../../../../config/ApiConfig';

const EditUser = ({ isOpen, toggle, userProfile }) => {
    const [error, setError] = useState(null);

    if (!userProfile) {
        return null; 
    }

    const initialValues = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        phoneno: userProfile.phoneno,
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneno: Yup.string().required('Phone Number is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch(`${ApiConfig.ApiPrefix}/edit-user/${userProfile.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update user');
            }
            toggle();
            toast.success('User details updated successfully!');
        } catch (error) {
            setError(error.message);
            toast.error('Failed to update user. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader style={{ marginTop: '8px', paddingTop: '8px', border: 'none', paddingBottom: '2px', marginBottom: '0px' }}>
                <span style={{ fontSize: 18, color: '#832729' }}>Edit User Details</span>
            </ModalHeader>
            <ModalBody>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
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
                                <Input type="text" name="phoneno" id="phone" value={userProfile.phoneno} className="form-control" readOnly style={{ backgroundColor: '#f0f0f0' }} />
                            </FormGroup>
                            {error && <div className="text-danger">{error}</div>}
                            <ModalFooter>
                                <Button type="submit" disabled={isSubmitting} style={{ backgroundColor: '#832729', borderColor: '#832729' }}>Save Changes</Button>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
            <ToastContainer />
        </Modal>
    );
};

export default EditUser;
