import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarPage from '../../components/Navbar/Navbar_Page';
import Footer from '../../components/Footer/footer';

const Layout = () => {
  return (
    <>
      <NavbarPage /> {/* Common Navbar */}
      <Outlet /> {/* Renders the current route component */}
      <Footer /> {/* Common Footer */}
    </>
  );
};

export default Layout;