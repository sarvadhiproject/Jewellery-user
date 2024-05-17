import React, { useState } from 'react';
import { Steps } from 'antd';
import { FaTruck, FaCreditCard } from 'react-icons/fa';
import { TbCoinRupeeFilled } from "react-icons/tb";
import AddressForm from './component/AddressForm';
import BillAddress from './component/BillAddress';
import PaymentForm from './component/PaymentForm';

const { Step } = Steps;

const CheckoutSteps = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [addressId, setAddressId] = useState(null);

    const handleStepCompletion = (stepIndex,addressId = null) => {
        setCurrentStep(stepIndex + 1);
        setAddressId(addressId);
        console.log(currentStep);
        console.log(addressId);
      };

    return (
        <div>
            <Steps direction="vertical" current={currentStep} className="custom-steps">
                <Step
                    title="Shipping Address"
                    status={currentStep >= 0 ? "process" : "wait"}
                    icon={<FaTruck style={{ color: '#832729', fontSize: '25px' }} />}
                    description={["process", "finish"].includes(currentStep >= 0 ? "process" : "wait") && <AddressForm onStepCompleted={(id) => handleStepCompletion(0, id)} />} />
                <Step
                    title="Billing Address"
                    status={currentStep >= 1 ? "process" : "wait"}
                    icon={<FaCreditCard style={{ color: '#832729', fontSize: '25px' }} />}
                    description={["process", "finish"].includes(currentStep >= 1 ? "process" : "wait") && <BillAddress addressId={addressId} onStepCompleted={() => handleStepCompletion(1)} />} />
                <Step
                    title="Payment"
                    status={currentStep >= 2 ? "process" : "wait"}
                    icon={<TbCoinRupeeFilled style={{ color: '#832729', fontSize: '30px' }} />}
                    description={["process", "finish"].includes(currentStep >= 2 ? "process" : "wait") && <PaymentForm onStepCompleted={() => handleStepCompletion(2)}   setOrderSuccess={props.setOrderSuccess} setOrderId={props.setOrderId}/>} />
            </Steps>
        </div>
    );
};

export default CheckoutSteps;
