import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardImg, CardBody } from 'reactstrap';
import Slider from 'react-slick';
import StarRating from './StarRating';
import WishlistButton from '../wishlist/WishlistButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ApiConfig from '../../config/ApiConfig';

const Bestseller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeDot, setActiveDot] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetchHighRatedProducts();
    }, []);

    const fetchHighRatedProducts = async () => {
        try {
            const response = await axios.get(`${ApiConfig.ApiPrefix}/view-products-ratings-cloudinary`);
            if (Array.isArray(response.data)) {
                const highproduct = response.data.map((d) => ({
                    ...d,
                    Images: Array.isArray(d.p_images) ? d.p_images.map(image => `${ApiConfig.cloudprefix}` + image) : []
                }));
                setProducts(highproduct);
                setLoading(false);
            } else {
                console.error("Response data is not an array:", response.data);
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching high-rated products:', error.message);
            setError(true);
            setLoading(false);
        }
    };

    const handleDotClick = (index) => {
        setActiveDot(index);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    const handleMouseEnter = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage && products[index].p_images[1]) cardImage.src = products[index].p_images[1];
    };

    const handleMouseLeave = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage) cardImage.src = products[index].p_images[0];
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
    if (loading) {
        return null;
    }

    if (error) {
        return null;
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0px' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', marginTop: '50px', marginBottom: '30px', color: "#832729", fontWeight: "bold", marginRight: '20px', marginLeft: '35px', fontFamily: 'Gill Sans', fontSize: '25px' }}>Best seller</h2>
                <a href="/view-more" style={{ color: '#832729', fontWeight: 'bold', textAlign: 'center', paddingTop: '25px', fontFamily: 'Gill Sans', fontSize: '18px', marginRight: '50px', borderBottom: '1px solid #832729' }}>View More</a>
            </div>
            <div style={{ marginLeft: '60px', marginBottom: '20px' }}>
                <Slider {...settings} ref={sliderRef}>
                    {products.map((product, index) => (
                        <div key={index}>
                            <Card
                                className='product-card'
                                style={{ marginBottom: '20px' }}
                                onMouseEnter={() => { handleMouseEnter(index); }}
                                onMouseLeave={() => { handleMouseLeave(index); }}
                            >
                                <WishlistButton
                                    product_id={product.product_id}
                                />
                                <Link to={`/product-details`} state={{ product_id: product.product_id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ position: 'relative' }}>
                                        <CardImg
                                            top
                                            id={`card-image-${index}`}
                                            src={product.p_images[0]}
                                            alt={product.product_name}
                                            className="product-card-img"
                                        />
                                    </div>
                                    <CardBody style={{ padding: '10px' }}>
                                        <div className='product-cardbody-div' style={{ textAlign: 'center' }}>
                                            <p className='product-names'>{product.product_name}</p>
                                            <StarRating ratings={product.ratings} />
                                            <span style={{ marginTop: '10px', display: 'flex' }}>
                                                <p>&#8377;{product.selling_price}</p>
                                                <label className='text-muted' style={{ marginLeft: '5px', fontSize: '12px', marginTop: '2px' }}> MRP</label>
                                                <p className='text-muted' style={{ textDecoration: 'line-through', marginLeft: '5px', fontSize: '12px', marginTop: '2px' }}>&#8377;{product.mrp}</p>
                                            </span>
                                        </div>
                                    </CardBody>
                                </Link>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default Bestseller;

