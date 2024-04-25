import React, { useRef, useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Signup from "./SignUp";

const AccountPopup = ({ isOpen, toggle }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const accountLinkRef = useRef(null);
    const popupRef = useRef(null);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!popupRef.current || !accountLinkRef.current) return;

            if (
                isOpen &&
                !popupRef.current.contains(event.target) &&
                !accountLinkRef.current.contains(event.target)
            ) {
                toggle();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, toggle]);

    useEffect(() => {
        if (accountLinkRef.current) {
            const rect = accountLinkRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.pageYOffset + 10,
                left: rect.left + window.pageXOffset
            });
        }
    }, []);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (!isOpen) {
            toggle();
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (isOpen) {
            toggle();
        }
    };

    const handleLoginButtonClick = () => {
        setLoginOpen(true);
    };

    const handleSignupButtonClick = () => {
        setSignupOpen(true);
    };

    return (
        <div style={{ position: "fixed", top: position.top, left: position.left, zIndex: 1000 }}>
            <div ref={popupRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Card className={`account-popup ${isOpen || isHovering ? "active" : ""}`}>
                    <CardBody>
                        <h1 style={{ marginTop: '0px', textAlign: 'center', color: '#832729', fontFamily: 'Gill sans' }}>My Account</h1>
                        <p style={{ marginTop: '0px', textAlign: 'center', color: '#832729' }}>Login to access your account</p>
                        <div className="btn-group" style={{ marginTop: '0px', textAlign: 'center' }}>
                            <Button style={{ borderColor: '#832729', backgroundColor: '#ffffff' }} onClick={handleLoginButtonClick}>
                                <span style={{ color: '#832729' }}>Login</span>
                            </Button>
                            <Button style={{ backgroundColor: '#832729' }} onClick={handleSignupButtonClick}>
                                Signup
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            {isLoginOpen && <Login isOpen={isLoginOpen} toggle={() => setLoginOpen(false)} />}
            {isSignupOpen &&
                <AuthProvider>
                    <Signup isOpen={isSignupOpen} toggle={() => setSignupOpen(false)} />
                </AuthProvider>
            }
        </div>
    );
};

export default AccountPopup;
