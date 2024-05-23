import React, { useState, useContext, useRef } from 'react';
import { Button, Modal, ModalBody, FormGroup, Card, CardBody, Input, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebaseApp from './Firebase';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import IntlTelInput from 'react-intl-tel-input';
// eslint-disable-next-line
import 'react-intl-tel-input/dist/main.css';
import { useSnackbar } from 'notistack';
import Countdown from 'react-countdown';
import AuthContext from './AuthContext';
import * as Yup from 'yup';

const Signup = ({ isOpen, toggle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [phoneno, setPhoneNo] = useState('');
  const [otp, setOtp] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [issending, setissending] = useState(false);
  const [isverifying, setisverifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const recaptchaVerifierRef = useRef(null);
  const [countdownDate, setCountdownDate] = useState(null);
  const [countdownKey, setCountdownKey] = useState(Date.now());


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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setissending(true);
    try {
      const auth = getAuth(firebaseApp);
      const appVerifier = createRecaptchaInstance(auth);
      const phoneNumberWithCountryCode = `+${countryCode}${phoneno.replace(/[^\d]/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier);
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
      setissending(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setisverifying(true);
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
      // setOtpVerified(true);
      enqueueSnackbar('OTP Verified', { variant: 'success' });

    } catch (error) {
      console.error('Error verifying OTP: ', error);
      enqueueSnackbar('Error verifying OTP', { variant: 'error' });
    } finally {
      setisverifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const appVerifier = createRecaptchaInstance(auth);
      const phoneNumberWithCountryCode = `+${countryCode}${phoneno.replace(/[^\d]/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier);
      confirmationResultRef.current = confirmation;
      enqueueSnackbar('Verification code resent', { variant: 'success' });
      const countdownEndDate = new Date(Date.now() + 180000); 
      setCountdownDate(countdownEndDate);
      setCountdownKey(Date.now());
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

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    setIsLoading(true);
    try {
      console.log("Form values:", values);
      console.log("Phone number:", phoneno);
      console.log("Country code:", countryCode);
      const { success, message } = await register(values.first_name, values.last_name, values.email, phoneno);
      if (success) {
        enqueueSnackbar(message, { variant: 'success' });
        resetForm(); 
        window.location.reload();
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Error registering:', error);
      enqueueSnackbar('Registration failed. Please try again later.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} style={{marginTop:'90px'}} >
        <ModalBody className="custom-modal-body">
          <div className="custom-container">
            <div className="custom-image-card">
              <Card className="image-card">
                <CardBody></CardBody>
              </Card>
            </div>
            <div className="custom-content-card">
              <Card className="content-card">
                <CardBody className='signcardbody'>
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
                      <Form className='signupdiv'>
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
                                <Button type="button" onClick={handleSendOTP} className="otp-button" disabled={issending} >
                                  {issending ? <Spinner size='sm' color="light" /> : 'Send OTP'}
                                </Button>
                              </div>
                              {!isPhoneNumberValid && <div className="error-message">Phone number is invalid</div>}
                            </FormGroup>
                          )}

                          {otpSent && (
                            <FormGroup className='otp-verify'>
                              <div className="otp-verification-container">
                                <Input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="custom-input otp-input" />
                                <Button type="button" onClick={handleVerifyOTP} className="otp-verify-button" disabled={isverifying} >
                                  {isverifying ? <Spinner size='sm' color="light" /> : 'Verify OTP'}
                                </Button>
                              </div>
                              {countdownDate && (
                                <div className="resend-otp-container" style={{ position: 'relative', right: '40px', marginTop: '8px' }}>
                                  <label className='text-muted'>Haven't received the OTP ?</label>
                                  <Countdown key={countdownKey} date={countdownDate} renderer={props => <CountdownRenderer {...props} />} />
                                </div>
                              )}
                            </FormGroup>
                          )}
                          <div className="register-button-container">
                            <Button type="submit" className="register-button" disabled={isLoading}>
                              {isLoading ? <Spinner size='sm' color="light" /> : 'Register'}
                            </Button>
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


