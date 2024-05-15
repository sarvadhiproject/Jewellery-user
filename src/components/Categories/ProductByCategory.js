import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarPage from '../Navbar/Navbar_Page';
import Footer from '../Footer/footer';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';
import WishlistButton from '../wishlist/WishlistButton';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import BreadcrumbNavigation from '../Navbar/BreadcrumbNavigation';


const ProductsByCategory = () => {
    const location = useLocation();
    const category_id = location.state?.category_id;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProductsByCategory() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/products/by-category/${category_id}`);
                if (response.data && Array.isArray(response.data.data)) {
                    const categoryProducts = response.data.data.map((product) => ({
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
            <>
                <div style={{ padding: '90px 0px 0px', position: 'relative', left: '130px' }}>
                    <BreadcrumbNavigation />
                </div>
                <div className='container' style={{ padding: '20px 0px 20px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Row>
                        {products.map((product, index) => (
                            <Col className='col' key={product.product_id} style={{ marginBottom: '20px' }}>
                                <Card className='product-card'
                                    onMouseEnter={() => { handleMouseEnter(index); }}
                                    onMouseLeave={() => { handleMouseLeave(index); }}
                                >
                                   <WishlistButton product_id={product.product_id}/>
                                    <Link to={`/product-details`} state={{ product_id: product.product_id, product_name: product.product_name, category_name: location.state?.category_name,}} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            </>
            <Footer />
        </>
    );
};

export default ProductsByCategory;
