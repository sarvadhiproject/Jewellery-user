import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Modal, ModalBody, Input, Card, CardBody, Spinner } from 'reactstrap';
import firebaseApp from './Firebase';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import IntlTelInput from 'react-intl-tel-input';
// eslint-disable-next-line
import 'react-intl-tel-input/dist/main.css';
import axios from 'axios';
import Signup from './SignUp';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';
import Countdown from 'react-countdown';
import ApiConfig from '../../config/ApiConfig';

const Login = ({ isOpen, toggle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNo, setPhoneNo] = useState('');
  const [otp, setOtp] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const confirmationResultRef = useRef(null);
  const [countryCode, setCountryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdownDate, setCountdownDate] = useState(null);
  const [countdownKey, setCountdownKey] = useState(Date.now());
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const recaptchaVerifierRef = useRef(null);

  const createRecaptchaInstance = (auth) => {
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      console.log('reCAPTCHA cleared');

      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        recaptchaContainer.remove();
      }
    }

    const newRecaptchaContainer = document.createElement('div');
    newRecaptchaContainer.id = 'recaptcha-container';
    document.body.appendChild(newRecaptchaContainer);


    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA resolved..');
      }
    });

    recaptchaVerifierRef.current = appVerifier;

    return appVerifier;
  };

  const handlePhoneNoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      const appVerifier = createRecaptchaInstance(auth);
      const phoneNumberWithCountryCode = `+${countryCode}${phoneNo.replace(/[^\d]/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier, {
        appVerifier: { timeout: 120000 }
      });

      confirmationResultRef.current = confirmation;
      setOtpSent(true);
      enqueueSnackbar('Verification code sent', { variant: 'success' });
      const countdownEndDate = new Date(Date.now() + 180000);
      setCountdownDate(countdownEndDate);
      setCountdownKey(Date.now());
    } catch (error) {
      console.error('Error sending verification code: ', error);
      enqueueSnackbar('Error sending verification code, Try Again', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const code = otp;
      if (!confirmationResultRef.current) {
        console.error('Confirmation result is undefined');
        return;
      }

      const confirmation = confirmationResultRef.current;
      const result = await confirmation.confirm(code, {
        appVerifier: { timeout: 120000 }
      });
      const user = result.user;

      if (!user) {
        console.error('User object is undefined');
        return;
      }

      console.log('User Logged In Successfully:', user);
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);

      const response = await axios.post(`${ApiConfig.ApiPrefix}/auth/user-login`, { idToken });
      if (response.status === 200) {
        console.log('ID token verified on the server');
        enqueueSnackbar('User Logged In Successfully', { variant: 'success' });

        const { token } = response.data;

        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken && decodedToken.id) {
          localStorage.setItem('key', decodedToken.authority);
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('firstName', decodedToken.first_name);
          localStorage.setItem('accessToken', token);
          window.location.reload();
        } else {
          console.error('User ID not found in decoded token');
          enqueueSnackbar('Login failed, try again', { variant: 'error' });
        }

      } else {
        console.error('ID token verification failed on the server');
        enqueueSnackbar('Login failed, try again', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      enqueueSnackbar('Error verifying OTP', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const appVerifier = createRecaptchaInstance(auth);
      const phoneNumberWithCountryCode = `+${countryCode}${phoneNo.replace(/[^\d]/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier, {
        appVerifier: { timeout: 120000 }
      });

      confirmationResultRef.current = confirmation;
      enqueueSnackbar('Verification code resent', { variant: 'success' });
      const countdownEndDate = new Date(Date.now() + 180000);
      setCountdownDate(countdownEndDate);
      setCountdownKey(Date.now());
      console.log('Countdown End Date:', countdownEndDate);
    } catch (error) {
      console.error('Error resending verification code: ', error);
      enqueueSnackbar('Error resending verification code, Try Again', { variant: 'error' });
    }
  };

  const CountdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Button onClick={handleResendOTP} className="resend-otp-btn">Resend OTP</Button>;
    } else {
      return (
        <span className='text-muted' style={{ fontSize: '13px', marginLeft: '2px' }}>
          <label style={{ textDecoration: 'underline', margin: '4px 2px' }}>Resend</label>
          <label className='text-muted'> in {minutes}:{seconds.toString().padStart(2, '0')}s</label>
        </span>
      );
    }
  };

  const handlePhoneNumberChange = (isValid, phoneNumber, countryData) => {
    setPhoneNo(phoneNumber);
    setCountryCode(countryData.dialCode);

    const phoneNumberRegex = /^[0-9]{10}$/;
    const isValidNumber = phoneNumberRegex.test(phoneNumber);

    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
      setIsPhoneNumberValid(false);
    } else if (!isValidNumber) {
      setPhoneNumberError('Phone number must be 10 digits');
      setIsPhoneNumberValid(false);
    } else {
      setPhoneNumberError('');
      setIsPhoneNumberValid(true);
    }
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  return (
    <>
      <Modal isOpen={isOpen && !showSignup} toggle={toggle} style={{ marginTop: '90px', marginLeft: '450px' }}>
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
                      <FormGroup>
                        <div className="input-phone">
                          <IntlTelInput
                            preferredCountries={['IN']}
                            onPhoneNumberChange={handlePhoneNumberChange}
                            inputClassName="form-control"
                          />
                          <div id="recaptcha-container"></div>
                          <div className="button-container">
                            <Button type="submit" disabled={isLoading || !isPhoneNumberValid}>
                              {isLoading ? <Spinner size='sm' color="light" /> : 'Send OTP'}
                            </Button>
                          </div>
                        </div>
                        {phoneNumberError && <div className="text-danger" style={{padding:'0px 15px'}}>{phoneNumberError}</div>}
                      </FormGroup>
                    </Form>
                  )}

                  {otpSent && (
                    <>
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
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? <Spinner size='sm' color="light" /> : 'Verify OTP'}
                            </Button>
                          </div>
                        </FormGroup>
                      </Form>
                      {otpSent && countdownDate && (
                        <div className="resend-otp-container">
                          <label className='text-muted'>Haven't received the OTP ?</label>
                          <Countdown key={countdownKey} date={countdownDate} renderer={props => <CountdownRenderer {...props} />} />
                        </div>
                      )}
                    </>
                  )}

                  <p style={{ textAlign: 'center' }}>Don't have an account? <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: '#832729', textAlign: 'center' }}>Sign up</span></p>
                </CardBody>
              </Card>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {showSignup && <Signup isOpen={true} toggle={() => setShowSignup(false)} />}
    </>
  );
};

export default Login;
