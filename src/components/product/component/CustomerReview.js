import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row, Container, Button, Modal, ModalBody } from 'reactstrap';
import { FaUserCircle } from "react-icons/fa";
import StarRating from '../../bestseller/StarRating';
import ApiConfig from '../../../config/ApiConfig';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const CustomerReview = ({ product_id }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProductReviews = async () => {
            try {
                const response = await axios.get(`${ApiConfig.ApiPrefix}/reviews/product/${product_id}`);
                console.log(response.data);

                if (response) {
                    setReviews(response.data.reviews);
                } else {
                    console.error('Failed to fetch product reviews:', response.data.message);
                }
            } catch (error) {
                console.error('An error occurred while fetching product reviews:', error.message);
            }
        };

        fetchProductReviews();
    }, [product_id]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            return 0;
        }

        const totalRating = reviews.reduce((acc, review) => acc + review.ratings, 0);
        return totalRating / reviews.length;
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ border: 'none' }}>
                        <CardBody>
                            <h3 style={{ marginBottom: '2px' }}>Customer Reviews</h3>
                            {reviews.length > 0 ? (
                                <>
                                    <section>
                                        <div style={{ fontSize: '22px' }}>
                                            <StarRating ratings={calculateAverageRating(reviews)} />
                                        </div>
                                        <div style={{ display: 'flex', fontSize: '30px', fontWeight: '600', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                {calculateAverageRating(reviews).toFixed(1)}
                                                <span className='text-muted' style={{ fontWeight: '450' }}>/5</span>
                                            </div>
                                            <label className='text-muted' style={{ fontSize: '17px', fontWeight: '550' }}>Based on {reviews.length} ratings</label>
                                        </div>
                                    </section>
                                    <label style={{ marginTop: '5px', fontWeight: '600', fontSize: '22px', marginBottom: '10px' }}>Most Useful Review</label>
                                    <div key={reviews[0].id} style={{ marginBottom: '13px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <FaUserCircle style={{ fontSize: '35px', marginRight: '10px' }} />
                                            <label style={{ marginBottom: '0', fontWeight: '600', fontSize: '17px' }}>{reviews[0].user.first_name} {reviews[0].user.last_name}</label>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <StarRating ratings={reviews[0].ratings} />
                                            <label className='text-muted' style={{ marginBottom: '0', fontSize: '14px', fontWeight: '600' }}>
                                                {new Date(reviews[0].createdAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                            </label>
                                        </div>
                                        <label style={{ fontSize: '16px', marginBottom: '0', marginTop: '12px' }}>{reviews[0].review_text}</label>
                                    </div>
                                    <Button className='review-btn' onClick={toggleModal}>
                                        Read All Reviews
                                        <IoIosArrowForward style={{ fontSize: '18px' }} />
                                    </Button>
                                </>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                                    <FaUserCircle style={{ fontSize: '5rem', color: '#ccc' }} />
                                    <h4 style={{ marginTop: '1rem' }}>Be the first to leave a review!</h4>
                                    <p style={{ textAlign: 'center', color: '#666' }}>
                                        We'd love to hear your thoughts on this product. Your review will help others make informed decisions.
                                    </p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal
                isOpen={isModalOpen}
                toggle={toggleModal}
                size="lg"
                style={{
                    width: '410px',
                    margin: '0px',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    position: 'fixed',
                }}
            >
                <div style={{ borderBottom: '0.5px solid black', width: '96%', display: 'flex', alignItems: 'center' }}>
                    <IoMdClose style={{ fontSize: '25px', fontWeight: 'bold' }} onClick={toggleModal} />
                    <h3 style={{ position: 'relative', left: '30%', marginTop: '10px' }}>All Reviews</h3>
                </div>
                <ModalBody style={{width:'410px'}}>
                    <section>
                        <div style={{ fontSize: '22px', textAlign: 'center' }}>
                            <StarRating ratings={calculateAverageRating(reviews)} />
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '600', textAlign: 'center' }}>
                            {calculateAverageRating(reviews).toFixed(1)}
                            <span className='text-muted' style={{ fontWeight: '450' }}>/5</span>
                            <br></br>
                            <label className='text-muted' style={{ fontSize: '20px', fontWeight: '550', textAlign: 'center' }}>Based on {reviews.length} ratings</label>
                        </div>
                    </section>
                    <hr></hr>
                    {reviews.map(review => (
                        <div key={review.id} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <FaUserCircle style={{ fontSize: '35px', marginRight: '10px' }} />
                                <label style={{ marginBottom: '0', fontWeight: '600', fontSize: '17px' }}>{review.user.first_name} {review.user.last_name}</label>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <StarRating ratings={review.ratings} />
                                <label className='text-muted' style={{ marginBottom: '0', fontSize: '14px', fontWeight: '600' }}>
                                    {new Date(review.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </label>
                            </div>
                            <label style={{ fontSize: '16px', marginBottom: '0', marginTop: '12px' }}>{review.review_text}</label>
                            <hr></hr>
                        </div>
                    ))}
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default CustomerReview;