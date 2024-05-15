import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';
import axios from 'axios';
import ApiConfig from '../../../../config/ApiConfig';
import WishlistButton from '../../../wishlist/WishlistButton';
import emptywishlist from "../../../../assets/images/Empty wishlist.svg";

const WishlistProduct = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const accessToken = localStorage.getItem('accessToken');



    useEffect(() => {

        if (accessToken) {
            const userid = localStorage.getItem('userId');

            async function fetchWishlistProducts() {
                try {
                    const response = await axios.get(`${ApiConfig.ApiPrefix}/wishlist/${userid}`);
                    // console.log('wislist api', response.data);
                    if (Array.isArray(response.data)) {
                        setWishlistItems(response.data);
                    } else {
                        console.error("Wishlist items are not an array:", response.data);
                    }
                } catch (error) {
                    console.error('Error fetching wishlist products:', error);
                }
            }

            fetchWishlistProducts();
             // eslint-disable-next-line react-hooks/exhaustive-deps
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveFromWishlist = (productId) => {
        setWishlistItems(prevWishlistItems =>
            prevWishlistItems.filter(item => item.product_id !== productId)
        );
    };

    useEffect(() => {
        const handleRemoveEvent = (event) => {
            const { productId } = event.detail;
            handleRemoveFromWishlist(productId);
        };

        document.addEventListener('removeFromWishlist', handleRemoveEvent);

        return () => {
            document.removeEventListener('removeFromWishlist', handleRemoveEvent);
        };
    }, []);


    const handleMouseEnter = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage && wishlistItems[index].p_images.length > 1) {
            cardImage.src = `${ApiConfig.cloudprefix}${wishlistItems[index].p_images[1]}`;
        }
    };

    const handleMouseLeave = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage) {
            cardImage.src = `${ApiConfig.cloudprefix}${wishlistItems[index].p_images[0]}`;
        }
    };

    return (
        <>
            {!accessToken ? (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <img src={emptywishlist} alt='Empty wishlist' style={{ width: '130px' }} />
                        <h3 style={{ fontFamily: 'Nunito Sans' }}>Login to view your wishlist</h3>
                    </div>
                </div>
            ) : wishlistItems.length === 0 ? (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <img src={emptywishlist} alt='Empty wishlist' style={{ width: '130px' }} />
                        <h3 style={{ fontFamily: 'Nunito Sans' }}>Your Wishlist Is Empty !</h3>
                        <Link to="/" ><label className='cart-product-name' style={{ color: '#832729', fontSize: '13px' }} > Continue Shopping </label></Link>
                    </div>
                </div>
            ) : (
                <>
                    <h2 style={{ fontFamily: 'Nunito Sans' }}>Wishlist</h2>
                    <div className='container' style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                        <Row>
                            {wishlistItems.map((product, index) => (
                                <Col className='col' key={product.product_id} style={{ marginBottom: '20px' }}>
                                    <Card className='product-card'
                                        onMouseEnter={() => { handleMouseEnter(index); }}
                                        onMouseLeave={() => { handleMouseLeave(index); }}
                                    >
                                        <WishlistButton product_id={product.product_id} />
                                        <Link to={`/product-details`}  state={{ product_id: product.product_id }} style={{ textDecoration: 'none', color: 'inherit' }}>                                            <div style={{ position: 'relative' }}>
                                                {product.p_images && product.p_images.length > 0 && (
                                                    <CardImg
                                                        top
                                                        src={`${ApiConfig.cloudprefix}${product.p_images[0]}`}
                                                        alt={product.product_name}
                                                        className="product-card-img"
                                                        id={`card-image-${index}`}
                                                    />
                                                )}
                                            </div>
                                            <CardBody style={{ padding: '10px' }}>
                                                <div className='product-cardbody-div'>
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
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            )}
        </>
    );
};

export default WishlistProduct;
