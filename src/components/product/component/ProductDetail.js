import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Container, Row, Col, Spinner } from 'reactstrap';
import { LuBadgeCheck, LuUserCheck, LuPackage } from "react-icons/lu";
import ReactImageMagnify from 'react-image-magnify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from 'react-select';
import axios from 'axios';
import StarRating from '../../ProductDisplay/StarRating';
import QuantityPicker from './QuantityPicker';
import ApiConfig from '../../../config/ApiConfig';
import { useCart } from '../../cart/Context/CartContext';
import { useSnackbar } from 'notistack';
import WishlistButton from '../../wishlist/WishlistButton';

const countries = [
    { value: 'India', label: 'India' },
];
const defaultCountry = countries[0];

const ProductDetail = ({ product_id }) => {
    const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sizeValidationError, setSizeValidationError] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [pincode, setPincode] = useState('');
    const [deliveryAvailability, setDeliveryAvailability] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/products/details/${product_id}`);
                // console.log('product:', response.data);
                if (response.data && response.data.data) {
                    const productDetails = response.data.data;
                    const Images = Array.isArray(productDetails.imageURLs) ? productDetails.imageURLs.map(image => `${image}`) : [];
                    setProduct({ ...productDetails, images: Images });
                    if (Images.length > 0) {
                        setSelectedImage(Images[0]);
                    }
                    setLoading(false);
                } else {
                    console.error("Invalid response data:", response.data);
                    setError(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching product details:', error.message);
                setError(true);
                setLoading(false);
            }
        };

        async function fetchProductReviews() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/reviews/product/${product_id}`);
                if (response && response.data) {
                    const reviews = response.data.reviews;
                    if (reviews.length > 0) {
                        const totalRating = reviews.reduce((acc, review) => acc + review.ratings, 0);
                        const avgRating = totalRating / reviews.length;
                        setAverageRating(avgRating);
                    }
                } else {
                    console.error('Failed to fetch product reviews:', response.data.message);
                }
            } catch (error) {
                console.error('An error occurred while fetching product reviews:', error.message);
            }
        }

        fetchProductDetails();
        fetchProductReviews();
    }, [product_id]);

    if (loading) {
        return null;
    }

    if (error || !product) {
        return null;
    }

    const getSizeOptions = (sizeString) => {
        if (sizeString) {
            const sizes = sizeString.split(',');
            return sizes.map(size => ({ value: size, label: size }));
        }
        return [];
    };

    const renderSizeOptions = () => {
        const isRingOrBangles = ['ring', 'bangles'].includes(product.category?.category_name?.toLowerCase());

        if (isRingOrBangles && product.size) {
            return (
                <div>
                    <label style={{ textAlign: 'center' }}>Size:</label>
                    <br />
                    <Select
                        className="country size"
                        options={getSizeOptions(product.size)}
                        onChange={(selectedOption) => setSelectedSize(selectedOption.value)}
                    />
                    {sizeValidationError && <span style={{ color: 'red' }}>Please select a size.</span>}
                </div>
            );
        }

        return null;
    };


    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handlePincodeCheck = () => {
        setDeliveryAvailability('Delivery available');
    };

    const handleAddToCart = async () => {
        const isRingOrBangles = ['ring', 'bangles'].includes(product.category?.category_name?.toLowerCase());

        if (isRingOrBangles && !selectedSize) {
            setSizeValidationError(true);
            enqueueSnackbar('Please select a size before adding to cart.', { variant: 'error' });
            return;
        }
        setSizeValidationError(false);
        setIsAddToCartLoading(true);
        try {
            const response = await addToCart(product.product_id, quantity, product.selling_price, selectedSize);
            if (response.success) {
                enqueueSnackbar(response.message, { variant: 'success' });
            }
            else {
                enqueueSnackbar(response.message, { variant: 'error' });
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            // enqueueSnackbar('Failed to add item to cart. Please try again later.', { variant: 'error' });
        } finally {
            setIsAddToCartLoading(false);
        }
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="is-next" onClick={onClick} style={{ zIndex: 1 }}><i className="ti-arrow-circle-right"></i></button>
        );
    }

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="is-prev" onClick={onClick} style={{ zIndex: 1, left: '-46px' }}><i className="ti-arrow-circle-left"></i></button>
        );
    }

    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    return (
        <>
            <Container style={{ borderBottom: '1px solid #832729' }}>
                <Row>
                    <Col className='col-lg-6' style={{ padding: '0px' }}>
                        <div style={{ marginTop: '55px' }}>
                            <Card className="text-center" style={{ border: 'none', height: '500px', alignContent: 'center' }}>
                                <CardBody>
                                    <div className="large-image-container">
                                        <ReactImageMagnify
                                            {...{
                                                smallImage: {
                                                    alt: product.name,
                                                    isFluidWidth: true,
                                                    src: selectedImage,
                                                },
                                                largeImage: {
                                                    src: selectedImage,
                                                    width: 1100,
                                                    height: 1100,
                                                },
                                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                                                style: { display: 'block', maxWidth: '450px' },
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div style={{ paddingLeft: '30px', marginTop: '15px', maxWidth: '550px' }}>
                            <Slider {...settings}>
                                {product.images.map((image, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        <div className="mb-3" style={{ width: '120px', cursor: 'pointer' }} onClick={() => handleImageClick(image)}>
                                            <Card>
                                                <CardImg src={image} alt={`Images ${index}`} style={{ maxWidth: '120px' }} />
                                            </Card>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                    <Col className='col-lg-5' style={{ padding: '0px', marginTop: '10px' }}>
                        <Card style={{ border: 'none' }}>
                            <CardBody style={{ paddingLeft: '0px', paddingBottom: '0px' }}>
                                <CardTitle style={{ borderBottom: '1px solid #832729' }}>
                                    <div style={{fontSize: '22px', left: '12px' }}>
                                        <WishlistButton product_id={product.product_id} />
                                    </div>
                                    <h3 style={{ marginBottom: '0px' }}>{product.product_name}</h3>
                                    <StarRating ratings={averageRating} />
                                </CardTitle>
                                <CardText style={{ fontSize: '13px', paddingLeft: '5px' }}>{product.basic_description}</CardText>
                                <span style={{ paddingLeft: '5px' }}>
                                    <span style={{ fontSize: '25px', fontWeight: 'bold', alignItems: 'center' }}>&#8377;{product.selling_price} </span>
                                    <label style={{ marginLeft: '5px' }}>MRP </label>
                                    <label className='text-muted' style={{ paddingLeft: '6px', textDecoration: 'line-through' }}>&#8377;{product.mrp}</label>
                                </span>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '8px', alignItems: 'center', marginTop: '35px' }}>
                                    <div>
                                        <label style={{ textAlign: 'center' }}>Quantity:</label><br></br>
                                        <QuantityPicker min={1} max={10} onChange={handleQuantityChange} />
                                    </div>
                                    <div>
                                        {renderSizeOptions()}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 5px' }}>
                                    <CardText className="text-muted" style={{ margin: '30px 0px 15px', paddingLeft: '2px' }}>Gold Type: {product.gold_type} </CardText>
                                    <CardText className="text-muted" style={{ margin: '30px 0px 15px', paddingLeft: '2px' }}>Gold Purity: {product.purity} </CardText>
                                </div>
                                <div style={{padding:'0px 7px'}}>
                                    <Button className='product-details-cart-btn' onClick={handleAddToCart} disabled={isAddToCartLoading}>
                                        {isAddToCartLoading ? <Spinner size='sm' color="light" /> : 'Add To Cart'}
                                    </Button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', borderBottom: '1px solid #832729' }}>
                                    <Select options={countries} className='country' defaultValue={defaultCountry} />
                                    <div style={{ marginBottom: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: '190px', border: '1px solid lightgray', minHeight: '38px', borderRadius: '4px' }}>
                                            <input placeholder='Pincode ' className='border-0 pincode-input' maxLength={6} style={{ minWidth: '120px', height: '35px' }} value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                            <span style={{ cursor: 'pointer', margin: '0 5px', color: '#832729' }} onClick={handlePincodeCheck}>Check</span>
                                        </div>
                                        <label style={{ color: 'green' }}>{deliveryAvailability}</label>
                                    </div>
                                </div>
                                <div style={{ padding: '5px 0' }}>
                                    <ul style={{ listStyleType: 'none', padding: '5px 2px', margin: '0' }}>
                                        <li style={{ margin: '5px' }}>
                                            <LuBadgeCheck style={{ fontSize: '19px', fontWeight: '500', marginRight: '2px' }} />
                                            <label style={{ fontSize: '14px', fontWeight: '600', alignItems: 'center' }}>Certified Product</label>
                                        </li>
                                        <li style={{ margin: '5px' }}>
                                            <LuUserCheck style={{ fontSize: '19px', fontWeight: '500', marginRight: '2px' }} />
                                            <label style={{ fontSize: '14px', fontWeight: '600', alignItems: 'center' }}>Trusted Vendor</label>
                                        </li>
                                        <li style={{ margin: '5px' }}>
                                            <LuPackage style={{ fontSize: '19px', fontWeight: '500', marginRight: '2px' }} />
                                            <label style={{ fontSize: '14px', fontWeight: '600', alignItems: 'center' }}>Free shipping all across India</label>
                                        </li>
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default ProductDetail;
