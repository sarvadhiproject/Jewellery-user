import React, { Component } from 'react';
import { Container, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                    <Container fluid style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, marginTop: 70, marginBottom: 40 }}>
                        <h3 style={{ textAlign: 'center', color: '#832729', fontFamily: 'Domine', marginBottom: 30 }}>CUSTOMER LOVE</h3>
                        <div id="customer-slider" className="flexslider">
                            <Slider {...settings}>
                                {this.props.reviews.map((review, index) => (
                                    <div key={index}>
                                        <Card className="review-card">
                                            <div className="profile-picture">
                                                <img src={review.profilePicture} alt="Profile" />
                                            </div>
                                            <CardBody>
                                                <div className="customer-info">
                                                    <CardTitle style={{ fontWeight: 'bold', marginTop: 30 }}>{review.customerName}</CardTitle>
                                                    <CardText style={{ marginTop: 30, fontStyle: 'italic', color: '#B18376', fontWeight:'bold' }}>
                                                        <span>&ldquo;</span>{review.review}<span>&rdquo;</span>
                                                    </CardText>
                                                </div>
                                                <div className="product-info" style={{ marginTop: 50 }}>
                                                    <CardImg src={review.productImage} alt="Product" className="product-image" />
                                                    <div className="product-details">
                                                        <p>{review.productName}</p>
                                                    </div>
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
