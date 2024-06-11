import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import logo from "../../assets/images/1.svg";

import FooterLinks from "./footer-links";
import LinkSection from "./link-section";

const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};

class Footer extends Component {
    state = {
        links2: [
            { link: "#", title: "About Us" },
            { link: "#", title: "Help & Support" },
            { link: "#", title: "Privacy Policy" },
            { link: "#", title: "Terms & Conditions" },
            { link: "#", title: "FAQ" },
        ],
        socials: [
            { class: "bg-twitter", icon: "ti-twitter-alt", link: "#" },
            { class: "bg-dribbble", icon: "ti-dribbble", link: "#" },
            { class: "bg-linkedin", icon: "ti-linkedin", link: "#" },
            { class: "bg-googleplus", icon: "ti-google", link: "#" },
            { class: "bg-facebook", icon: "ti-facebook", link: "#" },
            { class: "bg-instagram", icon: "ti-instagram", link: "#" },
        ]
    }
    render() {
        const socialChunks = chunkArray(this.state.socials, 2);
        return (
            <React.Fragment>
                <footer className="footer" style={{ backgroundColor: '#F2E9E9' }}>
                    <Container style={{ borderBottom: '2px solid #832729' }}>
                        <Row>
                            <Col md="4" sm="12">
                                <img src={logo} alt="logo" height={85} style={{ position: 'relative', right: '60px', bottom:'10px' }} />
                                <p style={{position:'relative', bottom:'15px'}} >Elegance is not just about being noticed, it's about being remembered. Let your jewelry be a reflection of your inner radiance, an expression of your unique style and grace. With every piece, may you carry a whisper of enchantment and a touch of timeless beauty.</p>
                            </Col>

                            <Col md={{ size: 3, offset: 2 }} sm="6">
                                <LinkSection title="Useful Links" links={this.state.links2} />
                            </Col>

                            <Col md="3" sm="6">
                                <h5 className="mb-3">Follow Us</h5>
                                {socialChunks.map((chunk, chunkIndex) => (
                                    <ul key={chunkIndex} className="list-inline social">
                                        {chunk.map((social, key) => (
                                            <li key={key} className="list-inline-item">
                                                <Link to={social.link} className={social.class + " mr-1"}><i className={social.icon}></i></Link>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </Col>

                        </Row>

                    </Container>
                </footer>
                <FooterLinks />
            </React.Fragment>
        );
    }
}

export default Footer;