import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarPage from '../Navbar/Navbar_Page';
import Footer from '../Footer/footer';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';
import WishlistButton from '../wishlist/WishlistButton';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';

const ProductsByCategory = () => {
    const { category_id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProductsByCategory() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/products-by-category/${category_id}`);
                if (Array.isArray(response.data)) {
                    const categoryProducts = response.data.map((product) => ({
                        ...product,
                        p_images: Array.isArray(product.p_images) ? product.p_images.map(image => `${ApiConfig.cloudprefix}` + image) : []
                    }));
                    setProducts(categoryProducts);
                    setLoading(false);
                } else {
                    console.error("Response data is not an array:", response.data);
                    setError(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching products by category:', error);
                setError(true);
                setLoading(false);
            }
        }

        fetchProductsByCategory();
    }, [category_id]);

    const handleMouseEnter = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage && products[index].p_images[1]) cardImage.src = products[index].p_images[1];
    };

    const handleMouseLeave = (index) => {
        const cardImage = document.getElementById(`card-image-${index}`);
        if (cardImage) cardImage.src = products[index].p_images[0];
    };

    if (loading) {
        return null; 
    }

    if (error) {
        return null; 
    }

    return (
        <>
            <NavbarPage />
            <div className='container' style={{ padding: '60px 0px 20px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Row>
                    {products.map((product, index) => (
                        <Col className='col' key={product.product_id} style={{ marginBottom: '20px' }}>
                            <Card className='product-card'
                                onMouseEnter={() => { handleMouseEnter(index); }}
                                onMouseLeave={() => { handleMouseLeave(index); }}
                            >
                                <WishlistButton
                                    product_id={product.product_id}
                                />
                                <Link to={`/product-details/${product.product_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ position: 'relative' }}>
                                        {product.p_images && product.p_images.length > 0 && (
                                            <CardImg
                                                top
                                                src={product.p_images[0]} 
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
            <Footer />
        </>
    );
};

export default ProductsByCategory;
