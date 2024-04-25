import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const UserSidebar = ({ setActiveComponent }) => {
  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="sidebar-container">
      <Nav vertical>
        <NavItem>
          <NavLink onClick={() => handleNavLinkClick('personalInformation')} style={{cursor:'pointer'}}>
            Personal Information
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleNavLinkClick('trackOrder')} style={{cursor:'pointer'}}>
            Track Order
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleNavLinkClick('orderHistory')} style={{cursor:'pointer'}}>
            Order History
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleNavLinkClick('wishlist')} style={{cursor:'pointer'}}>
            Wishlist
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default UserSidebar;
