import React, { useState, Suspense } from 'react';
import UserSidebar from './UserSiderbar';
import PersonalInfo from './components/userprofile/PersonalInfo'; 
import NavbarPage from '../Navbar/Navbar_Page';
import Footer from '../Footer/footer';
import WishlistProduct from './components/wishlist/WishlistProduct';

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
    const [activeComponent, setActiveComponent] = useState('personalInformation');

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'trackOrder':
                return <div>Track Order Component</div>;
            case 'orderHistory':
                return <div>Order History Component</div>;
            case 'wishlist':
                return <WishlistProduct/>;
            case 'personalInformation':
                return <PersonalInfo />; // Render PersonalInfo component
            default:
                return null;
        }
    };

    return (
      <React.Fragment>
          <Suspense fallback={<Loader />} >
              <NavbarPage setActiveComponent={setActiveComponent} />
              <div className="user-account">
                  <h2 className='user-header'>MY ACCOUNT</h2>
                  <div className="user-account-content">
                      <UserSidebar setActiveComponent={setActiveComponent} />
                      <div className="personal-info-wrapper">
                          {renderActiveComponent()}
                      </div>
                  </div>
              </div>
              <Footer />
          </Suspense>
      </React.Fragment>
  );
}

export default UserAccount;
