import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import 'antd/dist/reset.css';
import { FaCheckCircle } from 'react-icons/fa';
import { Card, CardBody, Row, Col, CardImg } from 'reactstrap';
import ApiConfig from '../../config/ApiConfig';

const { Step } = Steps;

const TrackOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);


  const order = {
    order_id: '4OA668345877',
    order_date: '2024-05-21 11:02:59.146+05:30',
    total_amount: '45533.74',
    status: 'Shipped',
  };

  const deliveryDetails = {
    shipping: {
      firstname: 'Lissa ',
      lastname: 'Jhon',
      address: '502 velocity hub',
      state: 'Gujarat',
      city: 'surat',
      pincode: 395002,
      mobileno: 9227904998,
    },
    billing: {
      firstname: 'Lissa ',
      lastname: 'Jhon',
      address: '502 velocity hub',
      state: 'Gujarat',
      city: 'surat',
      pincode: 395002,
      mobileno: 9227904998,
    },
  };

  const orderItems = [
    {
      order_id: '4OA668345877',
      product_name: 'Rose Gold Captivating Gaze Diamond Pendant',
      product_image: 'products/aog0hkx0juuzxxxv2w6a',
      quantity: 1,
    },
    {
      order_id: '4OA668345877',
      product_name: 'Contemporary Diamond Stud Earrings',
      product_image: 'products/srfydyn2tu0vljihi50u',
      quantity: 1,
    },
  ];

  const statusDescriptions = {
    'Order Placed': '08 May 2024',
    'Processing': '',
    'Shipped': '',
    'Out for Delivery': '',
    'Delivered': '',
  };

  useEffect(() => {
    // Define the order of statuses
    const statusOrder = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

    // Get the current step index based on the order status
    const stepIndex = statusOrder.indexOf(order.status);
    setCurrentStep(stepIndex);
  }, [order.status]);


  const customDot = (dot, { status, index }) => {
    if (status === 'finish') {
      return <FaCheckCircle className='check-icon' />;
    }
    else if (status === 'process' && (order.status==='Order Placed' || order.status==='Delivered')){
      return <FaCheckCircle className='check-icon' />;
    }
    if (status === 'process') {
      return <div style={{ backgroundColor: '#832729', borderRadius: '50%', width: '15px', height: '15px' }} />;
    }
    return dot;
  };

  return (
    <>
      <div className="order-info" style={{ padding: '12px 20px' }}>
        <div>
          <strong>Order ID: {order.order_id} </strong>
        </div>
        <div>
          <strong>Total Amount: ₹{order.total_amount}</strong>
        </div>
      </div>

      <Card style={{}}>
        <CardBody>
          <Row>
            <div style={{ padding: '15px', paddingTop: '0px', color: '#832729', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold' }}><p>Track the Order</p></div>
            <Col md={12}>
              <Steps progressDot={customDot} current={currentStep} >
                {Object.keys(statusDescriptions).map((status, index) => (
                  <Step
                    key={index}
                    title={status}
                    status={index < currentStep ? 'finish' : index === currentStep ? 'process' : 'wait'}
                    description={statusDescriptions[status]}
                  />
                ))}
              </Steps>
            </Col>
          </Row>

          <Row style={{ marginTop: '80px' }}>
            <div style={{ padding: '0px 15px', color: '#832729', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold' }}> <p>Delivery Details</p> </div>
            <Col md={6}>
              <Card style={{ backgroundColor: '#F2E9E9', border: 'none' }}>
                <CardBody style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
                  <h4 style={{ color: '#832729' }}>Shipping Address</h4>
                  <div>{deliveryDetails.shipping.firstname}{deliveryDetails.shipping.lastname}</div>
                  <div>{deliveryDetails.shipping.address}</div>
                  <div>{deliveryDetails.shipping.city}, {deliveryDetails.shipping.state}, {deliveryDetails.shipping.pincode}</div>
                  <div>{deliveryDetails.shipping.mobileno}</div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ backgroundColor: '#F2E9E9', border: 'none' }}>
                <CardBody style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
                  <h4 style={{ color: '#832729' }}>Billing Address</h4>
                  <div>{deliveryDetails.billing.firstname}{deliveryDetails.billing.lastname}</div>
                  <div>{deliveryDetails.billing.address}</div>
                  <div>{deliveryDetails.billing.city}, {deliveryDetails.billing.state}, {deliveryDetails.billing.pincode}</div>
                  <div>{deliveryDetails.billing.mobileno}</div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div style={{ border: '1px solid #D3D3D3', borderRadius: '5px', marginTop: '30px' }}>
        <div className='product-order'>
          <strong>Inside the Box:</strong>
          <div style={{ marginRight: '15px' }}>
          </div>
        </div>
        <div style={{ padding: '0px 15px', paddingTop: '2px' }}>
          {orderItems.map((orderItem, index) => (
            <Card style={{ height: '90px', border: 'none' }} key={index}>
              <Row>
                <Col xs='2' style={{ width: '10.66667%' }}>
                  <CardImg src={`${ApiConfig.cloudprefix}${orderItem.product_image}`} alt={orderItem.product_name} style={{ height: '70px', width: '70px' }} />
                </Col>
                <Col xs='5' style={{ width: '44.6678%' }}>
                  <div>
                    <strong>{orderItem.product_name}</strong>
                    <div style={{ marginTop: '8px' }}> Qty: <strong>{orderItem.quantity}</strong></div>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrackOrder;

// import React, { useState, useEffect } from 'react';
// import { Steps } from 'antd';
// import 'antd/dist/reset.css';
// import { FaCheckCircle } from 'react-icons/fa';
// import { Card, CardBody, Row, Col, CardImg } from 'reactstrap';
// import ApiConfig from '../../config/ApiConfig';

// const { Step } = Steps;

// const TrackOrder = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const order = {
//     order_id: '4OA668345877',
//     order_date: '2024-05-20 11:02:59.146+05:30',
//     update_date: '2024-05-21 11:02:59.146+05:30',
//     total_amount: '45533.74',
//     status: 'Shipped',
//   };

//   const [statusDates, setStatusDates] = useState({
//     'Order Placed': '',
//     'Processing': '',
//     'Shipped': '',
//     'Out for Delivery': '',
//     'Delivered': '',
//   });



//   const deliveryDetails = {
//     shipping: {
//       firstname: 'Lissa ',
//       lastname: 'Jhon',
//       address: '502 velocity hub',
//       state: 'Gujarat',
//       city: 'surat',
//       pincode: 395002,
//       mobileno: 9227904998,
//     },
//     billing: {
//       firstname: 'Lissa ',
//       lastname: 'Jhon',
//       address: '502 velocity hub',
//       state: 'Gujarat',
//       city: 'surat',
//       pincode: 395002,
//       mobileno: 9227904998,
//     },
//   };

//   const orderItems = [
//     {
//       order_id: '4OA668345877',
//       product_name: 'Rose Gold Captivating Gaze Diamond Pendant',
//       product_image: 'products/aog0hkx0juuzxxxv2w6a',
//       quantity: 1,
//     },
//     {
//       order_id: '4OA668345877',
//       product_name: 'Contemporary Diamond Stud Earrings',
//       product_image: 'products/srfydyn2tu0vljihi50u',
//       quantity: 1,
//     },
//   ];

//   useEffect(() => {
//     const statusOrder = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
//     const stepIndex = statusOrder.indexOf(order.status);
//     setCurrentStep(stepIndex);

//     const updateStatusDates = (status, date) => {
//       setStatusDates((prevDates) => ({
//         ...prevDates,
//         [status]: date,
//       }));
//     };

//     const formatDate = (date) => {
//       const options = { day: '2-digit', month: 'short', year: 'numeric' };
//       return new Date(date).toLocaleDateString('en-IN', options).replace(/ /g, '-');
//     };

//     updateStatusDates(order.status, formatDate(order.order_date));

//     for (let i = 0; i < stepIndex; i++) {
//       const prevStatus = statusOrder[i];
//       if (!statusDates[prevStatus]) {
//         updateStatusDates(prevStatus, formatDate(order.order_date));
//       }
//     }
//   }, [order.status, order.order_date, statusDates]);



//   const customDot = (dot, { status, index }) => {
//     if (status === 'finish') {
//       return <FaCheckCircle className='check-icon' />;
//     }
//     else if (status === 'process' && (order.status === 'Order Placed' || order.status === 'Delivered')) {
//       return <FaCheckCircle className='check-icon' />;
//     }
//     if (status === 'process') {
//       return <div style={{ backgroundColor: '#832729', borderRadius: '50%', width: '15px', height: '15px' }} />;
//     }
//     return dot;
//   };

//   return (
//     <>
//       <div className="order-info" style={{ padding: '12px 20px' }}>
//         <div>
//           <strong>Order ID: {order.order_id} </strong>
//         </div>
//         <div>
//           <strong>Total Amount: ₹{order.total_amount}</strong>
//         </div>
//       </div>

//       <Card style={{}}>
//         <CardBody>
//           <Row>
//             <div style={{ padding: '15px', paddingTop: '0px', color: '#832729', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold' }}><p>Track the Order</p></div>
//             <Col md={12}>
//               <Steps progressDot={customDot} current={currentStep} >
//                 {Object.keys(statusDates).map((status, index) => (
//                   <Step
//                     key={index}
//                     title={status}
//                     status={index < currentStep ? 'finish' : index === currentStep ? 'process' : 'wait'}
//                     description={statusDates[status]}
//                   />
//                 ))}
//               </Steps>
//             </Col>
//           </Row>

//           <Row style={{ marginTop: '80px' }}>
//             <div style={{ padding: '0px 15px', color: '#832729', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold' }}> <p>Delivery Details</p> </div>
//             <Col md={6}>
//               <Card style={{ backgroundColor: '#F2E9E9', border: 'none' }}>
//                 <CardBody style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
//                   <h4 style={{ color: '#832729' }}>Shipping Address</h4>
//                   <div>{deliveryDetails.shipping.firstname}{deliveryDetails.shipping.lastname}</div>
//                   <div>{deliveryDetails.shipping.address}</div>
//                   <div>{deliveryDetails.shipping.city}, {deliveryDetails.shipping.state}, {deliveryDetails.shipping.pincode}</div>
//                   <div>{deliveryDetails.shipping.mobileno}</div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col md={6}>
//               <Card style={{ backgroundColor: '#F2E9E9', border: 'none' }}>
//                 <CardBody style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
//                   <h4 style={{ color: '#832729' }}>Billing Address</h4>
//                   <div>{deliveryDetails.billing.firstname}{deliveryDetails.billing.lastname}</div>
//                   <div>{deliveryDetails.billing.address}</div>
//                   <div>{deliveryDetails.billing.city}, {deliveryDetails.billing.state}, {deliveryDetails.billing.pincode}</div>
//                   <div>{deliveryDetails.billing.mobileno}</div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </CardBody>
//       </Card>

//       <div style={{ border: '1px solid #D3D3D3', borderRadius: '5px', marginTop: '30px' }}>
//         <div className='product-order'>
//           <strong>Inside the Box:</strong>
//           <div style={{ marginRight: '15px' }}>
//           </div>
//         </div>
//         <div style={{ padding: '0px 15px', paddingTop: '2px' }}>
//           {orderItems.map((orderItem, index) => (
//             <Card style={{ height: '90px', border: 'none' }} key={index}>
//               <Row>
//                 <Col xs='2' style={{ width: '10.66667%' }}>
//                   <CardImg src={`${ApiConfig.cloudprefix}${orderItem.product_image}`} alt={orderItem.product_name} style={{ height: '70px', width: '70px' }} />
//                 </Col>
//                 <Col xs='5' style={{ width: '44.6678%' }}>
//                   <div>
//                     <strong>{orderItem.product_name}</strong>
//                     <div style={{ marginTop: '8px' }}> Qty: <strong>{orderItem.quantity}</strong></div>
//                   </div>
//                 </Col>
//               </Row>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TrackOrder;