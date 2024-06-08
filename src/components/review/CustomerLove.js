import React, { Component } from 'react';
import { Container, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUserCircle } from "react-icons/fa";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="is-next" onClick={onClick}><i className="ti-arrow-circle-right"></i></button>
    );
}

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="is-prev" onClick={onClick}><i className="ti-arrow-circle-left"></i></button>
    );
}

class CustomerLove extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            autoplay: false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            adaptiveHeight: true
        };

        return (
            <React.Fragment>
                <section id="customer-love">
                    <Container fluid style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, marginTop: 70, marginBottom: 20 }}>
                        <h3 style={{ textAlign: 'center', color: '#832729', fontFamily: 'Domine' }}>CUSTOMER LOVE</h3>
                        <div id="customer-slider" className="flexslider">
                            <Slider {...settings}>
                                {this.props.reviews.map((review, index) => (
                                    <div key={index}>
                                        <Card className="review-card">
                                            <div className="profile-picture">
                                                <FaUserCircle style={{ fontSize: '50px', marginRight: '10px' , color:'#872329'}} />
                                            </div>
                                            <CardBody style={{paddingTop:'0px'}}>
                                                <div className="customer-info">
                                                    <CardTitle style={{ fontWeight: 'bold',  fontSize:'20px' , marginBottom:'0px'}}>A Review by {review.customerName}</CardTitle>
                                                    <CardText style={{ marginTop: 20, fontStyle: 'italic', color: '#B18376', fontWeight: 'bold' }}>
                                                        <span>&ldquo;</span>{review.review}<span>&rdquo;</span>
                                                    </CardText>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default CustomerLove;
