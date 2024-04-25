import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Modal, ModalBody, Input, Card, CardBody } from 'reactstrap';
import firebaseApp from './Firebase';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import axios from 'axios';
import Signup from './SignUp';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiConfig from '../../config/ApiConfig';

const Login = ({ isOpen, toggle }) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [otp, setOtp] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const confirmationResultRef = useRef(null);
  const [countryCode, setCountryCode] = useState('');

  const handlePhoneNoSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebaseApp);
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA resolved..')
        }
      });

      const phoneNumberWithCountryCode = `+${countryCode}${phoneNo.replace(/[^\d]/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier);

      confirmationResultRef.current = confirmation;
      setOtpSent(true);
      toast.success('Verification code sent');
    } catch (error) {
      console.error('Error sending verification code: ', error);
      toast.error('Error sending verification code');
    }
  };


  const handleOtpSubmit = async (e) => {
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

      console.log('User Logged In Successfully:', user);
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);

      const response = await axios.post(`${ApiConfig.ApiPrefix}/user-login-phoneno`, { idToken });
      if (response.status === 200) {
        console.log('ID token verified on the server');
        toast.success('User Logged In Successfully');

        const { token } = response.data;

        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken && decodedToken.id) {
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('firstName', decodedToken.first_name);
          localStorage.setItem('accessToken', token);
          window.location.reload();
        } else {
          console.error('User ID not found in decoded token');
          toast.error('Login failed, try again');
        }

      } else {
        console.error('ID token verification failed on the server');
        toast.error('Login failed, try again');
      }
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      toast.error('Error verifying OTP');
    }
  };


  const handlePhoneNumberChange = (isValid, phoneNumber, countryData) => {
    setPhoneNo(phoneNumber);
    setCountryCode(countryData.dialCode);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  return (
    <>
      <Modal isOpen={isOpen && !showSignup} toggle={toggle} centered>
        <ModalBody className='login-modal-body'>
          <div className="login-container">
            <div className="login-image-card">
              <Card className="login-card">
                <CardBody></CardBody>
              </Card>
            </div>
            <div className="login-content-card">
              <Card className="login-custom-card">
                <CardBody>
                  <h1 className="header" style={{ marginBottom: '10px' }}>Login</h1>
                  <p className="semi-text" style={{ padding: '0' }}>Login with Mobile Number</p>
                  {!otpSent && (
                    <Form onSubmit={handlePhoneNoSubmit} className="mt-4">
                      <FormGroup className="input-phone">
                        <IntlTelInput
                          preferredCountries={['IN']}
                          onPhoneNumberChange={handlePhoneNumberChange}
                          inputClassName="form-control"
                        />
                        <div id="recaptcha-container"></div>
                        <div className="button-container">
                          <Button type="submit">Send OTP</Button>
                        </div>
                      </FormGroup>
                    </Form>
                  )}

                  {otpSent && (
                    <Form onSubmit={handleOtpSubmit} className="mt-4">
                      <FormGroup className="otp-input">
                        <Input
                          type="text"
                          name="otp"
                          id="otp"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          inputclassname="form-control"
                        />
                        <div className="button-container">
                          <Button type="submit">Verify OTP</Button>
                        </div>
                      </FormGroup>
                    </Form>
                  )}

                  <p style={{ textAlign: 'center' }}>Don't have an account? <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: '#832729', textAlign: 'center' }}>Sign up</span></p>
                </CardBody>
              </Card>
            </div>
          </div>
        </ModalBody>
        <ToastContainer />
      </Modal>
      {showSignup && <Signup isOpen={true} toggle={() => setShowSignup(false)} />}



    </>
  );
};

export default Login;
