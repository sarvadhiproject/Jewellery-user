import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';
import WishlistButton from '../wishlist/WishlistButton';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import BreadcrumbNavigation from '../Navbar/BreadcrumbNavigation';
import Filter from '../search/Filter';
import Section from '../../pages/Indexmain/component/section';


const ProductsByCategory = () => {
    const location = useLocation();
    const category_id = location.state?.category_id;
    const category_name = location.state?.category_name;
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

    const handleFiltersApplied = (filteredProducts) => {
        setProducts(filteredProducts);
      };

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
                <div style={{ padding: '90px 0px 0px' }}>
                    <BreadcrumbNavigation />
                </div>
                <div style={{position:'relative', bottom:'60px'}}>
                <Section category={category_name}/>
                </div>
                <div style={{ padding: '10px 150px', display: 'flex', justifyContent: 'right', bottom:'50px', position:'relative' }}>
                    <Filter onFiltersApplied={handleFiltersApplied} />
                </div>
                <div className='container' style={{ padding: '0px 0px 20px', display: 'flex', justifyContent: 'center' , bottom:'45px', position:'relative'}}>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {products.map((product, index) => (
                            <Col className='col' key={product.product_id} style={{ marginBottom: '20px' }}>
                                <Card className='product-card'
                                    onMouseEnter={() => { handleMouseEnter(index); }}
                                    onMouseLeave={() => { handleMouseLeave(index); }}
                                >
                                    <WishlistButton product_id={product.product_id} />
                                    <Link to={`/product-details`} state={{ product_id: product.product_id, product_name: product.product_name }} style={{ textDecoration: 'none', color: 'inherit' }}>
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
    );
};

export default ProductsByCategory;
