import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';
import axios from 'axios';
import ApiConfig from '../../../../config/ApiConfig';
import WishlistButton from '../../../wishlist/WishlistButton';

const WishlistProduct = () => {
    const [userID, setUserID] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedUserID = localStorage.getItem('userId');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);

    useEffect(() => {
        if (!userID) return;

        async function fetchWishlistProducts() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/wishlist/${userID}`);
                console.log('wislist api', response.data);
                if (Array.isArray(response.data.wishlistItems)) {
                    setWishlistItems(response.data.wishlistItems);
                } else {
                    console.error("Wishlist items are not an array:", response.data.wishlistItems);
                }
            } catch (error) {
                console.error('Error fetching wishlist products:', error);
            }
        }

        fetchWishlistProducts();
    }, [userID]);

    const handleMouseEnter = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage && wishlistItems[index].Product.p_images.length > 1) {
            cardImage.src = `${ApiConfig.cloudprefix}${wishlistItems[index].Product.p_images[1]}`;
        }
    };

    const handleMouseLeave = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage) {
            cardImage.src = `${ApiConfig.cloudprefix}${wishlistItems[index].Product.p_images[0]}`;
        }
    };

    return (
        <div className='container' style={{ padding: '60px 0px 20px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Row>
                {wishlistItems.map((product, index) => (
                    <Col className='col-md-4' key={product.Product.product_id} style={{ marginBottom: '20px' }}>
                        <Card className='product-card'
                            onMouseEnter={() => { handleMouseEnter(index); }}
                            onMouseLeave={() => { handleMouseLeave(index); }}
                        >
                            <WishlistButton product_id={product.product_id} />
                            <Link to={`/product-details/${product.Product.product_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative' }}>
                                    {product.Product.p_images && product.Product.p_images.length > 0 && (
                                        <CardImg
                                            top
                                            src={`${ApiConfig.cloudprefix}${product.Product.p_images[0]}`}
                                            alt={product.Product.product_name}
                                            className="product-card-img"
                                            id={`card-image-${index}`}
                                        />
                                    )}
                                </div>
                                <CardBody style={{ padding: '10px' }}>
                                    <div className='product-cardbody-div'>
                                        <p className='product-names'>{product.Product.product_name}</p>
                                        <span style={{ marginTop: '10px', display: 'flex' }}>
                                            <p>&#8377;{product.Product.selling_price}</p>
                                            <label className='text-muted' style={{ marginLeft: '5px', fontSize: '12px', marginTop: '2px' }}> MRP</label>
                                            <p className='text-muted' style={{ textDecoration: 'line-through', marginLeft: '5px', fontSize: '12px', marginTop: '2px' }}>&#8377;{product.Product.mrp}</p>
                                        </span>
                                    </div>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default WishlistProduct;
