import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom"; 
import { Card, CardBody } from "reactstrap";

const UserCard = ({ isOpen, toggle }) => {
    const firstName = localStorage.getItem("firstName") || "";
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const cardLinkRef = useRef(null);
    const cardpopupRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false); 



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!cardpopupRef.current || !cardLinkRef.current) return;
            if (
                isOpen &&
                !cardpopupRef.current.contains(event.target) &&
                !cardLinkRef.current.contains(event.target)
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
        if (cardLinkRef.current) {
            const rect = cardLinkRef.current.getBoundingClientRect();
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


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        localStorage.clear();
        window.location.reload();
        toggle();
    };

    return (
        <div style={{ position: "fixed", top: position.top, left: position.left, zIndex: 1000}}>
            <div ref={cardpopupRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Card className={`card-popup ${isOpen || isHovering ? "active" : ""}`}>
                    <CardBody>
                        <h3 className="user-card-header">Hello, {firstName}</h3>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li>
                                <NavLink to="/account" style={{ textDecoration: "none", color: "#832729", display: "block", marginBottom: "10px" }} >
                                    MY ACCOUNT
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order-history" style={{ textDecoration: "none", color: "#832729", display: "block", marginBottom: "10px" }}>
                                    ORDER HISTORY
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/track-order" style={{ textDecoration: "none", color: "#832729", display: "block", marginBottom: "10px" }} >
                                    TRACK ORDER
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="#" style={{ textDecoration: "none", color: "#832729", display: "block", marginBottom: "10px" }} onClick={handleLogout}>
                                    LOG OUT
                                </NavLink>
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UserCard;
