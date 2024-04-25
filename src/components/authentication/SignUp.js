import React, { useState, useContext, useRef } from 'react';
import { Button, Modal, ModalBody, FormGroup, Card, CardBody, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebaseApp from './Firebase';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import * as Yup from 'yup';

const Signup = ({ isOpen, toggle }) => {
  const [phoneno, setPhoneNo] = useState('');
  const [otp, setOtp] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);


  const { register } = useContext(AuthContext);
  const confirmationResultRef = useRef(null);
  const formikRef = useRef();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handlePhoneNumberChange = (isValid, phoneNumber, countryData) => {
    const isValidPhoneNumber = phoneNumber.trim().length > 0 && phoneNumber.replace(/[^\d]/g, '').length <= 10;
    setPhoneNo(phoneNumber);
    setCountryCode(countryData.dialCode); 
    setIsPhoneNumberValid(isValid && isValidPhoneNumber);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebaseApp);
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA resolved..')
        }
      });

      const phoneNumberWithCountryCode = `+${countryCode}${phoneno.replace(/[^\d]/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier);

      confirmationResultRef.current = confirmation;
      setOtpSent(true);
      toast.success('Verification code sent');
    } catch (error) {
      console.error('Error sending verification code: ', error);
      toast.error('Error sending verification code');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const code = otp;
      if (!confirmationResultRef.current) {
        console.error('Confirmation result is undefined');
        return;
      }
      const confirmation = confirmationResultRef.current;
      const result = await confirmation.confirm(code);
      const user = result.user;

      if (!user) {
        console.error('User object is undefined');
        return;
      }

      console.log('otp verified on firebase:', user);
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);
      setOtpVerified(true);
      toast.success('OTP verified');
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      toast.error('Error verifying OTP');
    }
  };

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log("Form values:", values);
      console.log("Phone number:", phoneno);
      console.log("Country code:", countryCode);
      const { success, message } = await register(values.first_name, values.last_name, values.email, phoneno);
      if (success) {
        toast.success(message);
        resetForm(); // Reset the form
        window.location.reload();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Registration failed. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ToastContainer />
        <ModalBody className="custom-modal-body">
          <div className="custom-container">
            <div className="custom-image-card">
              <Card className="image-card">
                <CardBody></CardBody>
              </Card>
            </div>
            <div className="custom-content-card">
              <Card className="content-card">
                <CardBody>
                  <h1 className="header">Sign Up</h1>
                  <Formik
                    innerRef={formikRef}
                    initialValues={{
                      first_name: '',
                      last_name: '',
                      email: '',
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    onSubmit={handleFormSubmit}
                  >
                    {(formikProps) => (
                      <Form>
                        <div className="input-group">
                          <FormGroup>
                            <Input type="text" name="first_name" placeholder="Enter First Name" tag={Field} className="custom-input" />
                            <ErrorMessage name="first_name" component="div" className="error-message" />
                          </FormGroup>
                          <FormGroup>
                            <Input type="text" name="last_name" placeholder="Enter Last Name" tag={Field} className="custom-input" />
                            <ErrorMessage name="last_name" component="div" className="error-message" />
                          </FormGroup>
                          <FormGroup>
                            <Input type="email" name="email" placeholder="Enter Email" tag={Field} className="custom-input" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                          </FormGroup>
                          {!otpSent && (
                            <FormGroup className="phone-input-group">
                              <div className="phone-input-container">
                                <IntlTelInput preferredCountries={['IN']} inputClassName="form-control custom-input" onPhoneNumberChange={handlePhoneNumberChange} />
                                <div id="recaptcha-container"></div>
                                <Button type="button" onClick={handleSendOTP} className="otp-button">Send OTP</Button>
                                {!isPhoneNumberValid && <div className="error-message">Phone number is invalid</div>}
                              </div>
                            </FormGroup>
                          )}

                          {otpSent && (
                            <FormGroup className="otp-verification-container">
                              <Input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="custom-input otp-input" />
                              <Button type="button" onClick={handleVerifyOTP} className="otp-verify-button">Verify OTP</Button>
                            </FormGroup>
                          )}
                          <div></div>
                          <div className="register-button-container">
                            <Button type="submit" className="register-button">Register</Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Signup;
