import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardImg, CardBody } from 'reactstrap';
import Slider from 'react-slick';
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
        fetchBestSellingProducts();
    }, []);

    const fetchBestSellingProducts = async () => {
        try {
            const response = await axios.get(`${ApiConfig.ApiPrefix}/products/bestsellers`);
            if (response.data && Array.isArray(response.data.data)) {
                const bestSellingProducts = response.data.data.map((d) => ({
                    ...d,
                    Images: Array.isArray(d.p_images) ? d.p_images.map(image => {
                        const completeUrl = `${ApiConfig.cloudprefix}` + image;
                        return completeUrl;
                    }) : []
                }));
                setProducts(bestSellingProducts);
                setLoading(false);
            } else {
                console.error("Response data is not in the expected format:", response.data);
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching best-selling products:', error.message);
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

    if (loading || error || products.length === 0) {
        return null; 
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0px' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', marginTop: '50px', marginBottom: '30px', color: "#832729", fontWeight: "bold", marginRight: '20px', marginLeft: '35px', fontFamily: 'Gill Sans', fontSize: '25px' }}>Best seller</h2>
            </div>
            <div style={{ marginLeft: '60px', marginBottom: '20px' }}>
                <Slider {...settings} ref={sliderRef}>
                    {products.map((product, index) => (
                        <div key={index}>
                            <Card
                                className='product-card'
                                style={{ marginBottom: '20px' }}
                            >
                                <WishlistButton
                                    product_id={product.product_id}
                                />
                                <Link to={`/product-details`} state={{ product_id: product.product_id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ position: 'relative' }}>
                                        <CardImg
                                            top
                                            id={`card-image-${index}`}
                                            src={product.Images[0]}
                                            alt={product.product_name}
                                            className="product-card-img"
                                        />
                                    </div>
                                    <CardBody style={{ padding: '10px' }}>
                                        <div className='product-cardbody-div' style={{ textAlign: 'center' }}>
                                            <p className='product-names'>{product.product_name}</p>
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

