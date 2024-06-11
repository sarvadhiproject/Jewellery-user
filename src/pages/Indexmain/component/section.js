import React, { Component } from 'react';
import { Container } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';

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
    constructor(props) {
        super(props);
        this.state = {
            banners: []
        };
    }

    componentDidMount() {
        this.fetchBanners();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.fetchBanners();
        }
    }

    fetchBanners = async () => {
        try {
            const { category } = this.props;
            const response = await axios.get(`${ApiConfig.ApiPrefix}/banner/bannersByCategory/${category}`);
            console.log(response.data);
            this.setState({ banners: response.data.data });
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    }

    render() {
        const { banners } = this.state;
        const { startIndex = 0, endIndex = banners.length } = this.props;
        const bannersToDisplay = banners.slice(startIndex, endIndex);

        const settings = {
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
                                {bannersToDisplay.map((banner, key) => (
                                    <div key={key}>
                                        <img src={`${banner.image_url}`} alt={`Slide ${key + 1}`} style={{ width: '1519px', height: '300px', objectFit: 'fill' }} />
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