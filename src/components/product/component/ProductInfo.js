import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row, Button, UncontrolledCollapse, Container } from 'reactstrap';
import { CgShoppingBag } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';

const ProductInfo = ({ product_id }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/products/details/${product_id}`);
                setProductDetails(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [product_id]);

    const [collapseOpen, setCollapseOpen] = useState({
        productDetailsToggle: false,
        knowYourProductToggle: false,
        vendorDetailsToggle: false
    });

    const toggleCollapse = (toggleId) => {
        setCollapseOpen(prevState => ({
            ...prevState,
            [toggleId]: !prevState[toggleId]
        }));
    };



    if (loading) {
        return null;
    }

    if (error || !productDetails) {
        return null;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ border: 'none' }}>
                        <CardBody >
                            <h3 style={{ marginBottom: '15px' }}>Product Information</h3>
                            <div style={{ borderBottom: '1px solid darkgray' }}>
                                <Button
                                    className="info-collape"
                                    id="productDetailsToggle"
                                    onClick={() => toggleCollapse('productDetailsToggle')}
                                >
                                    <div style={{ padding: '13px', paddingBottom: '0px' }}>
                                        <span style={{ display: 'flex' }}>
                                            <CgShoppingBag style={{ color: 'black', fontSize: '23px', paddingRight: '5px' }} />
                                            <h4 style={{ color: 'black', fontSize: '18px', textTransform: 'capitalize' }}>Product Details</h4>
                                        </span>
                                        {collapseOpen.productDetailsToggle ? (
                                            <IoIosArrowUp style={{ color: 'black', position: 'absolute', left: '97%', transform: 'translate(-50%, -50%)', top: '50%', fontSize: '25px' }} />
                                        ) : (
                                            <IoIosArrowDown style={{ color: 'black', position: 'absolute', left: '97%', transform: 'translate(-50%, -50%)', top: '50%', fontSize: '25px' }} />
                                        )}
                                        <label style={{ paddingLeft: '22px', color: 'black', textTransform: 'capitalize', marginBottom: '1rem' }}>Details</label>
                                    </div>
                                </Button>
                                <UncontrolledCollapse isOpen={collapseOpen.productDetailsToggle} toggler="#productDetailsToggle">
                                    <div style={{ padding: '0px 35px', fontWeight: '500', fontSize: '14px', marginBottom: '10px' }}>
                                        <Row>
                                            {productDetails.occasion_type && (
                                                <Col className='col-sm-6 mb-3'>
                                                    <label className='product-field'>Occasion Type</label><br />
                                                    <label className='product-value'>{productDetails.occasion_type}</label><br />
                                                </Col>
                                            )}
                                            {productDetails.weight && (
                                                <Col>
                                                    <label className='product-field'>Weight</label><br />
                                                    <label className='product-value'>{productDetails.weight}</label>
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {productDetails.gem_type && (
                                                <Col>
                                                    <label className='product-field'>Gem Type</label><br />
                                                    <label className='product-value'>{productDetails.gem_type}</label>
                                                </Col>
                                            )}
                                            {productDetails.gem_color && (
                                                <Col>
                                                    <label className='product-field'>Gem Color</label><br />
                                                    <label className='product-value' style={{ marginBottom: '10px' }}>{productDetails.gem_color}</label><br />
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {productDetails.no_of_gems !== 0 && (
                                                <Col>
                                                    <label className='product-field'>Number of Gems</label><br />
                                                    <label className='product-value'>{productDetails.no_of_gems}</label>
                                                </Col>
                                            )}
                                            {/* {productDetails.category.category_name !== "Rings" && productDetails.category.category_name !== "Bangles" && productDetails.size && ( */}
                                                <Col>
                                                    <label className='product-field'>Size</label><br />
                                                    <label className='product-value'>{productDetails.size}</label>
                                                </Col>
                                            {/* )} */}
                                        </Row>
                                    </div>
                                </UncontrolledCollapse>
                            </div>
                            <div style={{ borderBottom: '1px solid darkgray' }}>
                                <Button
                                    className="info-collape"
                                    id="knowYourProductToggle"
                                    onClick={() => toggleCollapse('knowYourProductToggle')}
                                >
                                    <div style={{ padding: '13px', paddingBottom: '0px' }}>
                                        <span style={{ display: 'flex' }}>
                                            <CgShoppingBag style={{ color: 'black', fontSize: '23px', paddingRight: '5px' }} />
                                            <h4 style={{ color: 'black', fontSize: '18px', textTransform: 'capitalize' }}>Know Your Product</h4>
                                        </span>
                                        {collapseOpen.knowYourProductToggle ? (
                                            <IoIosArrowUp style={{ color: 'black', position: 'absolute', left: '97%', transform: 'translate(-50%, -50%)', top: '50%', fontSize: '25px' }} />
                                        ) : (
                                            <IoIosArrowDown style={{ color: 'black', position: 'absolute', left: '97%', transform: 'translate(-50%, -50%)', top: '50%', fontSize: '25px' }} />
                                        )}
                                        <label style={{ paddingLeft: '22px', color: 'black', textTransform: 'capitalize', marginBottom: '1rem' }}>Description</label>
                                    </div>
                                </Button>
                                <UncontrolledCollapse isOpen={collapseOpen.knowYourProductToggle} toggler="#knowYourProductToggle">
                                    <div style={{ padding: '0px 30px', fontSize: '13px', marginBottom: '10px' }}>
                                        <label className='product-value'>{productDetails.main_description}</label>
                                    </div>
                                </UncontrolledCollapse>
                            </div>
                            <div style={{ borderBottom: '1px solid darkgray' }}>
                                <Button
                                    className="info-collape"
                                    id="vendorDetailsToggle"
                                    onClick={() => toggleCollapse('vendorDetailsToggle')}
                                >
                                    <div style={{ padding: '13px', paddingBottom: '0px' }}>
                                        <span style={{ display: 'flex' }}>
                                            <CgShoppingBag style={{ color: 'black', fontSize: '23px', paddingRight: '5px' }} />
                                            <h4 style={{ color: 'black', fontSize: '18px', textTransform: 'capitalize' }}>Vendor Details</h4>
                                        </span>
                                        {collapseOpen.vendorDetailsToggle ? (
                                            <IoIosArrowUp style={{ color: 'black', position: 'absolute', left: '97%', transform: 'translate(-50%, -50%)', top: '50%', fontSize: '25px' }} />
                                        ) : (
                                            <IoIosArrowDown style={{ color: 'black', position: 'absolute', left: '97%', transform: 'translate(-50%, -50%)', top: '50%', fontSize: '25px' }} />
                                        )}
                                        <label style={{ paddingLeft: '22px', color: 'black', textTransform: 'capitalize', marginBottom: '1rem'  }}>Manufacture Details</label>
                                    </div>
                                </Button>
                                <UncontrolledCollapse isOpen={collapseOpen.vendorDetailsToggle} toggler="#vendorDetailsToggle">
                                    <div style={{ padding: '0px 35px', fontWeight: '600', fontSize: '14px', marginBottom: '10px' }}>
                                        <label className='product-field'>Sold By</label><br></br>
                                        {productDetails.vendor ? (
                                            <>
                                                <label className='product-value' style={{ marginBottom: '12px' }}>
                                                    {productDetails.vendor.first_name}  {productDetails.vendor.last_name}
                                                </label><br></br>
                                                <label className='product-field'>Origin</label><br></br>
                                                <label className='product-value'>{productDetails.vendor.state_name}</label>
                                            </>
                                        ) : (
                                            <label className='product-value'>Vendor information not available</label>
                                        )}

                                    </div>
                                </UncontrolledCollapse>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductInfo;
