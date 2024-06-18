import React, { useState, useEffect, useCallback } from "react";
import { Nav, NavbarToggler, NavItem, Container, Collapse, Input, InputGroupText } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faSearch, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/1.svg";
import AccountPopup from "../authentication/AccountPopup";
import UserCard from "../userProfile/UserCard";
import Login from "../authentication/Login";


const NavbarPage = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      setFirstName(localStorage.getItem('firstName'));
    }
  }, [token]);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleAccountPopup = () => {
    setIsAccountPopupOpen(!isAccountPopupOpen);
  };

  const toggleUserCard = () => {
    setIsUserCardOpen(!isUserCardOpen);
  };

  const handleWishlistClick = useCallback(() => {
    if (isLoggedIn) {
      navigate('/account?activeComponent=wishlist');
    } else {
      setLoginOpen(true);
    }
  }, [isLoggedIn, navigate]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="sticky-wrapper">
        <div className="sticky-nav">
          <Nav className="navbar navbar-expand-lg fixed-top navbar-custom sticky d-flex align-items-center">
            <Container style={{maxWidth:'1280px'}}>
              <div className="logo-container" style={{width:'160px'}}>
                <Link to="/" className="navbar-brand logo text-uppercase" style={{marginRight:'0px', paddingBottom:'0px'}}>
                  <div>
                    <img src={logo} alt="logo" height="85" width="185" />
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
                      <Link to="http://192.168.29.245:3000/sign-in" className="nav-link">
                        <div className='nav-item-div'>
                          <FontAwesomeIcon icon={faShop} size="lg" color="#832729" /><br></br>
                          <span style={{ color: "#832729" }}>Vendor</span>
                        </div>
                      </Link>
                    </NavItem>
                    <NavItem>
                      {isLoggedIn ? (
                        <div className="nav-link" onClick={toggleUserCard} style={{ paddingTop: '5px', cursor: 'pointer' }}>
                          <div className='nav-item-div' style={{ fontWeight: '600', textTransform: 'uppercase' }} >
                            <FontAwesomeIcon icon={faUser} size="lg" color="#832729" /><br></br>
                            <span style={{ color: "#832729", fontSize: '13px' }}>{firstName}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="nav-link" onClick={toggleAccountPopup} style={{ paddingTop: '5px', cursor: 'pointer' }}>
                          <div className='nav-item-div' style={{ fontWeight: '600', textTransform: 'uppercase' }}>
                            <FontAwesomeIcon icon={faUser} size="lg" color="#832729" /><br></br>
                            <span style={{ color: "#832729", fontSize: '13px' }}>Account</span>
                          </div>
                        </div>
                      )}
                    </NavItem>
                    <NavItem>
                      <Link
                        to="/account?activeComponent=wishlist"
                        className="nav-link"
                        onClick={(e) => {
                          if (!isLoggedIn) {
                            e.preventDefault();
                            handleWishlistClick();
                          }
                        }}
                      >
                        <div className='nav-item-div' >
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
      {isLoginOpen && <Login isOpen={isLoginOpen} toggle={() => setLoginOpen(false)} />}
    </React.Fragment>
  );
};

export default NavbarPage;
