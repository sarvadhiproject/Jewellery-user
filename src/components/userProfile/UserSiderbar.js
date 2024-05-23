import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {

  return (
    <div className="sidebar-container">
      <Nav vertical>
        <NavItem>
          <NavLink to="/account?activeComponent=personalInformation" style={{cursor:'pointer'}} className='nav-link'>
            Personal Information
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/account?activeComponent=trackOrder" style={{cursor:'pointer'}} className='nav-link'>
            Track Order
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/account?activeComponent=orderHistory"  style={{cursor:'pointer'}} className='nav-link'>
            Order History
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/account?activeComponent=wishlist"  style={{cursor:'pointer'}} className='nav-link'>
            Wishlist
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default UserSidebar;
