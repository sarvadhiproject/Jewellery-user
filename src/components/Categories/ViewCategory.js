import React, { useState, useEffect } from 'react';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/all-categories`);
                const catData = response.data.map((d) => ({
                    ...d,
                    category_image: `${ApiConfig.cloudprefix}` + d?.category_image,
                }));
                setCategories(catData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError(true);
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) {
        return null; 
    }

    if (error) {
        return null; 
    }

    return (
        <>
            <div className='container' style={{ maxWidth: '1300px' }}>
                <h1 className='view-category-header'>SHOP BY CATEGORIES</h1>
                {categories.length > 0 &&
                    <Row className="view-category-row d-flex justify-content-center p-0 m-0" style={{ gap: '1.5rem' }}>
                        {categories.map((category, index) => (
                            <Col className="col-md-2 p-0" key={category.category_id}>
                                <Card className="view-category-card">
                                    <Link to={`/product-by-category/${category.category_id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                                        <CardImg
                                            top
                                            src={category.category_image}
                                            alt={category.category_name}
                                            className="view-category-img"
                                            onError={(e) => {
                                                console.error('Error loading image:', e);
                                            }}
                                        />
                                        <CardBody>
                                            <div className="view-category-text">
                                                <p className='category-name'>{category.category_name}</p>
                                            </div>
                                        </CardBody>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                }
            </div>
            <hr className='view-category-border' />
        </>
    );
};

export default Category;
