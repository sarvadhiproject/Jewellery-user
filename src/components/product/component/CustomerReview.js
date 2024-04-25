import React from 'react';
import { Card, CardBody, Col, Row, Container } from 'reactstrap';
import { FaUserCircle } from "react-icons/fa";
import StarRating from '../../bestseller/StarRating';

const customerReviews = [
    {
        id: 1,
        name: 'Maitreya Korekar',
        date: '10/04/2024',
        rating: 4.7,
        description: 'I purchased a dimond ring for my girlfriend and now she has been the most happiest girl from last whole week'
    },
];

const CustomerReview = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ border: 'none' }}>
                        <CardBody>
                            <h3>Customer Reviews</h3>
                            <section>
                                <div style={{ fontSize: '22px' }}>
                                    <StarRating ratings={4.5} />
                                </div>
                                <div style={{ display: 'inline-block', fontSize: '30px', fontWeight: '600' }}>
                                    4.5<span className='text-muted' style={{ fontWeight: '450' }}>/5</span>
                                </div>
                                <br></br>
                                <label className='text-muted' style={{ fontSize: '17px', fontWeight: '550' }}>Based on 250 ratings</label>
                            </section>
                            <label style={{ marginTop: '15px', fontWeight: '600', fontSize: '22px', marginBottom: '1rem' }}>Most Useful Review</label>
                            {customerReviews.map(review => (
                                <div key={review.id} style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <FaUserCircle style={{ fontSize: '35px', marginRight: '10px' }} />
                                        <label style={{ marginBottom: '0', fontWeight: '600', fontSize: '17px' }}>{review.name}</label>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <StarRating ratings={review.rating} />
                                        <label className='text-muted' style={{ marginBottom: '0', fontSize: '14px', fontWeight: '600' }}>{review.date}</label>
                                    </div>
                                    <label style={{ fontSize: '16px', marginBottom: '0', marginTop: '20px' }}>{review.description}</label>
                                </div>
                            ))}
                            <a href="#review" style={{ fontSize: '16px' }}>Read All Reviews</a>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerReview;
