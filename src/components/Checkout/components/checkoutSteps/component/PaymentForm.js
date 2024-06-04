import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// import ApiConfig from '../../../../../config/ApiConfig';

const stripePromise = loadStripe('pk_test_51PE3yrSDXuguFPe8N0EgCp0AXeCMeKQXoJ0aobLrY81r82k4MLeHPiKhIYxbFwJDHy0TjMfyJQk9QW1DDyYR5TWo00PmSy3QSZ');

const PaymentForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error("Customer ID not found in local storage.");
        return;
      }
      const sessionResponse = await axios.post(`https://87d0-117-236-78-84.ngrok-free.app/payment/create-checkout-session`, {
        user_id: userId,
      });

      const { sessionId } = sessionResponse.data;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        enqueueSnackbar("Failed to redirect to Stripe checkout", { variant: 'error' });
      } else {
        enqueueSnackbar("Redirecting to Stripe checkout", { variant: 'info' });
      }
    } catch (error) {
      console.error("Failed to process payment:", error);
      enqueueSnackbar("Failed to process payment, Try again later", { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '30px 0px' }}>
      <Button className='product-details-cart-btn' style={{ width: '85%' }} onClick={handlePayment} disabled={isLoading}>
        {isLoading ? <Spinner size='sm' color="light" /> : 'Pay Now'}
      </Button>
    </div>
  );
};

export default PaymentForm;