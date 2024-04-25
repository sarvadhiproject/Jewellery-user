import React, { Component } from 'react';
import { Container } from "reactstrap";
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

class Section extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 5000,
            autoplay: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            adaptiveHeight: true 
        };

        return (
            <React.Fragment>
                <section id="home">
                    <Container fluid style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                        <div id="home-slider" className="flexslider" style={{ marginTop: "60px", marginLeft: "0px" }}>
                            <Slider {...settings}>
                                {this.props.slides.map((slide, key) => (
                                    <div key={key}>
                                        <img src={slide.image} alt={`Slide ${key + 1}`} style={{ width: '1519px', height: '300px', objectFit: 'fill' }} />
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

export default Section;
