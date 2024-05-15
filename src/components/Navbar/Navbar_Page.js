import React, { useState, useRef, useEffect } from "react";
import { Nav, NavbarToggler, NavItem, Container, Collapse, Input, InputGroupText } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faSearch, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import AccountPopup from "../authentication/AccountPopup";
import UserCard from "../userProfile/UserCard";


const NavbarPage = () => {
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
    navigate('/account?activeComponent=wishlist');
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
          >
            <Container>
                <div className="logo-container">
                  <Link to="/" className="navbar-brand logo text-uppercase">
                    <div>
                      <img src={logo} alt="logo" height="80" />
                    </div>
                  </Link>
                </div>

                <div className="search-container d-flex align-items-center justify-content-center">
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                    className="search-input"
                  />
                  <InputGroupText style={{ cursor: "pointer", border: "none", background: "none" }}>
                    <FontAwesomeIcon icon={faSearch} size="lg" color="#832729" onClick={handleSearch} />
                  </InputGroupText>
                </div>
              <div>
                <NavbarToggler onClick={toggleMenu}>
                  <i className="ti-menu"></i>
                </NavbarToggler>

                <Collapse id="data-scroll" isOpen={isOpenMenu} navbar>
                  <Nav
                    navbar
                    className="ms-auto navbar-center"
                    id="mySidenav"
                  >
                    <NavItem >
                      <Link to="http://192.168.2.102:3000/sign-in" className="nav-link">
                        <div className='nav-item-div'>
                          <FontAwesomeIcon icon={faShop} size="lg" color="#832729" /><br></br>
                          <span style={{ color: "#832729" }}>Vendor</span>
                        </div>
                      </Link>
                    </NavItem>
                    <NavItem>
                      {isLoggedIn ? (
                        <Link to="" className="nav-link" ref={cardLinkRef} onClick={toggleUserCard}>
                          <div className='nav-item-div'>
                            <FontAwesomeIcon icon={faUser} size="lg" color="#832729" /><br></br>
                            <span style={{ color: "#832729" }}>{firstName}</span>
                          </div>
                        </Link>
                      ) : (
                        <Link to="" className="nav-link" ref={accountLinkRef} onClick={toggleAccountPopup}>
                          <div className='nav-item-div'>
                            <FontAwesomeIcon icon={faUser} size="lg" color="#832729" /><br></br>
                            <span style={{ color: "#832729" }}>Account</span>
                          </div>
                        </Link>
                      )}
                    </NavItem>
                    <NavItem>
                      <Link to="/account?activeComponent=wishlist" className="nav-link" onClick={handleWishlistClick}>
                        <div className='nav-item-div'>
                          <FontAwesomeIcon icon={faHeart} size="lg" color="#832729" /><br></br>
                          <span style={{ color: "#832729" }}>Wishlist</span>
                        </div>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/cart" className="nav-link">
                        <div className='nav-item-div'>
                          <FontAwesomeIcon icon={faCartShopping} size="lg" color="#832729" /><br></br>
                          <span style={{ color: "#832729" }}>Cart</span>
                        </div>
                      </Link>
                    </NavItem>
                  </Nav>
                </Collapse>
              </div>
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
