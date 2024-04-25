import React, { useState, useRef } from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';
import "@fontsource/nunito-sans";
import Slider from 'react-slick';
import StarRating from '../bestseller/StarRating'; 
import Rhoop from "../../assets/images/bestseller/Rhinestone-Hoop.jpg";
import cartier from "../../assets/images/bestseller/cartier.jpg";
import Solitaire from "../../assets/images/bestseller/Solitaire.jpg";
import Dingli from "../../assets/images/bestseller/Dingli-Choker.jpg";
import moon from "../../assets/images/bestseller/moon-choker.jpg";
import double from "../../assets/images/bestseller/double-ring.jpg";
import gemstone from "../../assets/images/bestseller/gemstone-ring.jpg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Trending = () => {
    const products = [
        {
            productId: 1,
            productName: 'Gemstone Rings',
            product_image: gemstone,
            rating: 4.5,
            price: 'Rs 500'
        },
        {
            productId: 2,
            productName: 'Moon Choker',
            product_image: moon,
            rating: 3.8,
            price: 'Rs 800'
        },
        {
            productId: 3,
            productName: 'Double Opening Rings',
            product_image: double,
            rating: 4.2,
            price: 'Rs 1200'
        },
        {
            productId: 4,
            productName: 'Solitaire Bracelets',
            product_image: Solitaire,
            rating: 5.0,
            price: 'Rs 1500'
        },
        {
            productId: 5,
            productName: 'Dingli Dainty Choker Set',
            product_image: Dingli,
            rating: 4.0,
            price: 'Rs 1000'
        },
        {
            productId: 6,
            productName: 'Rhinestone Hoop',
            product_image: Rhoop,
            rating: 4.8,
            price: 'Rs 900'
        },
        {
            productId: 7,
            productName: 'Cartier Bracelets',
            product_image: cartier,
            rating: 5.0,
            price: 'Rs 2000'
        },
        {
            productId: 8,
            productName: 'Zircon Decor Hoop Earrings',
            product_image: cartier,
            rating: 4.0,
            price: 'Rs 1800'
        },
    ];

    const sliderRef = useRef(null);
    const [activeDot, setActiveDot] = useState(0);

    const handleDotClick = (index) => {
        setActiveDot(index);
        sliderRef.current.slickGoTo(index); 
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        appendDots: (dots) => (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <ul style={{ margin: "0 auto", paddingLeft: '15px', paddingRight: '15px' }}>
                    {dots.map((dot, index) => (
                        <li
                            key={index}
                            className={index === activeDot ? "slick-active" : ""}
                            onClick={() => handleDotClick(index)}
                            style={{
                                width: "14px",
                                height: "14px",
                                backgroundColor: index === activeDot ? "#832729" : "gray",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "10px",
                                cursor: "pointer",
                            }}
                        ></li>
                    ))}
                </ul>
            </div>
        ),
        beforeChange: (current, next) => setActiveDot(next)
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', marginTop: '50px', marginBottom: '30px', color: "#832729", fontWeight: "bold", marginRight: '20px', marginLeft: '35px', fontFamily: 'Gill Sans', fontSize: '25px' }}>New Trends</h2>
                <a href="/view-more" style={{ color: '#832729', fontWeight: 'bold', textAlign: 'center', paddingTop: '25px', fontFamily: 'Gill Sans', fontSize: '18px', marginRight: '50px', borderBottom: '1px solid #832729' }}>View More</a>
            </div>
            <div style={{ marginLeft: '60px', marginBottom: '20px' }}>
            <Slider ref={sliderRef} {...settings}>
                {products.map((product, index) => (
                    <div key={product.productId}>
                        <Card className='product-card' style={{ marginBottom: '20px' }}>
                            <CardImg
                                top
                                src={product.product_image}
                                alt={product.productName}
                                className="product-card-img"
                            />
                            <CardBody style={{ padding: '10px' }}>
                                <div className='product-cardbody-div' style={{ textAlign: 'center' }}>
                                    <p className='product-names'>{product.productName}</p>
                                    <StarRating ratings={product.rating} style={{ marginBottom: '5px', padding: '2px' }} />
                                    <p>{product.price}</p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </Slider>
            </div>
        </>
    );
};

export default Trending;
