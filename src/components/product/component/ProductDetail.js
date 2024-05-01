import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Container, Row, Col } from 'reactstrap';
import { LuBadgeCheck, LuUserCheck, LuPackage } from "react-icons/lu";
import ReactImageMagnify from 'react-image-magnify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from 'react-select';
import axios from 'axios';
import StarRating from '../../bestseller/StarRating';
import QuantityPicker from './QuantityPicker';
import ApiConfig from '../../../config/ApiConfig';
import { useCart } from '../../cart/Context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const countries = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'USA' },
];
const defaultCountry = countries[0];

const ProductDetail = ({ product_id }) => {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [deliveryAvailability, setDeliveryAvailability] = useState('');

    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/product-details/${product_id}`);
                console.log('product:',response.data);
                if (response.data) {
                    const productDetails = response.data;
                    const Images = Array.isArray(productDetails.p_images) ? productDetails.p_images.map(image => `${ApiConfig.cloudprefix}${image}`) : [];
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

        fetchProductDetails();
    }, [product_id]);

    if (loading) {
        return null;
    }

    if (error || !product) {
        return null;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handlePincodeCheck = () => {
        setDeliveryAvailability('Delivery available');
    };

    const handleAddToCart = async () => {
        try {
            const response = await addToCart(product.product_id, quantity, product.selling_price);
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error('Failed to add item to cart. Please try again later.');
        }
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity); // Update quantity when changed in QuantityPicker
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
                                    <h3 style={{ marginBottom: '0px' }}>{product.product_name}</h3>
                                    <StarRating ratings={product.ratings} />
                                </CardTitle>
                                <CardText style={{ fontSize: '13px', paddingLeft: '5px' }}>{product.basic_description}</CardText>
                                <span style={{ paddingLeft: '5px' }}>
                                    <span style={{ fontSize: '25px', fontWeight: 'bold', alignItems: 'center' }}>&#8377;{product.selling_price} </span>
                                    <label style={{ marginLeft: '5px' }}>MRP </label>
                                    <label className='text-muted' style={{ paddingLeft: '6px', textDecoration: 'line-through' }}>&#8377;{product.mrp}</label>
                                </span>
                                <div style={{ marginTop: '30px', paddingLeft: '8px' }}>
                                    <label style={{ textAlign: 'center' }}>Quantity:</label><br></br>
                                    <QuantityPicker min={1} max={10} onChange={handleQuantityChange} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 5px' }}>
                                    <CardText className="text-muted" style={{ margin: '30px 0px 15px', paddingLeft: '8px' }}>Gold Type: {product.gold_type} </CardText>
                                    <CardText className="text-muted" style={{ margin: '30px 0px 15px', paddingLeft: '8px' }}>Gold Purity: {product.purity} </CardText>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button className='product-details-cart-btn' onClick={handleAddToCart}>Add To Cart</Button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #832729' }}>
                                    <Button className='product-details-cart-btn' style={{ marginBottom: '20px' }}>Buy Now</Button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', borderBottom: '1px solid #832729' }}>
                                    <Select options={countries} className='country' defaultValue={defaultCountry} />
                                    <div style={{ marginBottom: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: '190px', border: '1px solid lightgray', minHeight: '38px', borderRadius: '4px' }}>
                                            <input placeholder='Pincode ' className='border-0' maxLength={6} style={{ minWidth: '120px', height: '35px' }} value={pincode} onChange={(e) => setPincode(e.target.value)} />
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
