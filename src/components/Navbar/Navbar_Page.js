import React, { useState, useRef, useEffect } from "react";
import { Nav, NavbarBrand, NavbarToggler, NavItem, Container, Collapse, Input, InputGroupText } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faSearch, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import AccountPopup from "../authentication/AccountPopup";
import UserCard from "../userProfile/UserCard";


const NavbarPage = ({setActiveComponent}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const accountLinkRef = useRef(null);
  const cardLinkRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      setFirstName(localStorage.getItem('firstName'));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleAccountPopup = () => {
    setIsAccountPopupOpen(!isAccountPopupOpen);
  };

  const toggleUserCard = () => {
    setIsUserCardOpen(!isUserCardOpen);
  };

  const handleWishlistClick = () => {
    console.log("Wishlist icon clicked");
    setActiveComponent('wishlist');
    console.log("Active component set to wishlist");
  };

  const handleSearch = () => {
    console.log("Searching for: ", searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="sticky-wrapper">
        <div className="sticky-nav">
          <Nav
            className="navbar navbar-expand-lg fixed-top navbar-custom sticky d-flex align-items-center"
            style={{ backgroundColor: "#F2E9E9", height: "60px" }}
          >
            <Container>
              <NavbarBrand className="logo text-uppercase" to="/">
                <div className="d-flex align-items-center">
                  <img src={logo} alt="logo" height="80" />
                </div>
              </NavbarBrand>

              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                  style={{ maxWidth: "500px", width: "600px" }} 
                />
                <InputGroupText style={{ cursor: "pointer", border: "none", background: "none", }}>
                  <FontAwesomeIcon icon={faSearch} size="lg" color="#832729" onClick={handleSearch} />
                </InputGroupText>
              </div>

              <NavbarToggler onClick={toggleMenu}>
                <i className="ti-menu"></i>
              </NavbarToggler>

              <Collapse id="data-scroll" isOpen={isOpenMenu} navbar>
                <Nav
                  navbar
                  className="ms-auto navbar-center"
                  id="mySidenav"
                >
                  <NavItem>
                    <Link to="http://192.168.2.102:3000/sign-in" className="nav-link">
                      <div style={{ textAlign: "center", padding: '15px 8px 10px' }}>
                        <FontAwesomeIcon icon={faShop} size="lg" color="#832729" /><br></br>
                        <span style={{ color: "#832729" }}>Vendor</span>
                      </div>
                    </Link>
                  </NavItem>
                  <NavItem>
                    {isLoggedIn ? (
                      <Link to="" className="nav-link" ref={cardLinkRef} onClick={toggleUserCard}>
                        <div style={{ textAlign: "center", padding: '15px 8px 10px' }}>
                          <FontAwesomeIcon icon={faUser} size="lg" color="#832729" /><br></br>
                          <span style={{ color: "#832729" }}>{firstName}</span>
                        </div>
                      </Link>
                    ) : (
                      <Link to="#" className="nav-link" ref={accountLinkRef} onClick={toggleAccountPopup}>
                        <div style={{ textAlign: "center", padding: '15px 8px 10px' }}>
                          <FontAwesomeIcon icon={faUser} size="lg" color="#832729" /><br></br>
                          <span style={{ color: "#832729" }}>Account</span>
                        </div>
                      </Link>
                    )}
                  </NavItem>
                  <NavItem>
                    <Link to="/account" className="nav-link" onClick={handleWishlistClick}>
                      <div style={{ textAlign: "center", padding: '15px 8px 10px' }}>
                        <FontAwesomeIcon icon={faHeart} size="lg" color="#832729" /><br></br>
                        <span style={{ color: "#832729" }}>Wishlist</span>
                      </div>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/cart" className="nav-link">
                      <div style={{ textAlign: "center", padding: '15px 8px 10px' }}>
                        <FontAwesomeIcon icon={faCartShopping} size="lg" color="#832729" /><br></br>
                        <span style={{ color: "#832729" }}>Cart</span>
                      </div>
                    </Link>
                  </NavItem>

                </Nav>
              </Collapse>
            </Container>
          </Nav>
        </div>
      </div>

      <AccountPopup isOpen={isAccountPopupOpen} toggle={toggleAccountPopup} />
      <UserCard isOpen={isUserCardOpen} toggle={toggleUserCard} />
    </React.Fragment>
  );
};

export default NavbarPage;
