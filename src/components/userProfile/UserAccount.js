import React, { useState, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserSidebar from './UserSiderbar';
import PersonalInfo from './components/userprofile/PersonalInfo';
import WishlistProduct from './components/wishlist/WishlistProduct';
import OrderHistory from '../Order/OrderHistory';
import TrackOrder from '../Order/TrackOrder';

const Loader = () => {
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner">Loading...</div>
            </div>
        </div>
    );
}

const UserAccount = () => {
    const [activeComponent, setActiveComponent] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const activeComponent = searchParams.get('activeComponent');

        if (activeComponent === 'wishlist') {
            setActiveComponent('wishlist');
        }
        else if (activeComponent === 'orderHistory') {
            setActiveComponent('orderHistory');
        }
        else if (activeComponent === 'personalInformation') {
            setActiveComponent('personalInformation')
        }
        else if (activeComponent === 'trackOrder'){
            setActiveComponent('trackOrder')
        }
    }, [location.search]);



    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'trackOrder':
                return <TrackOrder/>;
            case 'orderHistory':
                return <OrderHistory />;
            case 'wishlist':
                return <WishlistProduct />;
            case 'personalInformation':
                return <PersonalInfo />;
            default:
                return;
        }
    };

    return (
        <React.Fragment>
            <Suspense fallback={<Loader />} >
                <div className="user-account">
                    <h2 className='user-header'>MY ACCOUNT</h2>
                    <div className="user-account-content">
                        <UserSidebar />
                        <div className="personal-info-wrapper">
                            {renderActiveComponent()}
                        </div>
                    </div>
                </div>
            </Suspense>
        </React.Fragment>
    );
}

export default UserAccount;
