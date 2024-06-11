import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Button } from 'reactstrap';
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';
import { FaRegStar, FaStar } from "react-icons/fa";
import ApiConfig from '../../config/ApiConfig';

const ReviewModal = ({ isOpen, toggle, productId, initialRating }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (e) => {
        const { value } = e.target;
        setReviewText(value);
    };

    const handleReviewSubmit = async () => {
        const userId = localStorage.getItem('userId');
        const product_id = productId;

        try {
            const response = await axios.post(`${ApiConfig.ApiPrefix}/reviews/add`, {
                user_id: userId,
                product_id,
                ratings: rating,
                review_text: reviewText
            });
            console.log('Review added successfully:', response.data);
            toggle();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} style={{ left: '250px' }}>
                <ModalHeader style={{ marginTop: '8px', paddingTop: '8px', border: 'none', paddingBottom: '2px', marginBottom: '0px' }}>
                    <span style={{ fontSize: 18, color: '#832729' }}>Add review</span>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="rating" style={{ marginBottom: '0px', }}>Rating</Label>
                        <div>
                            <Rating
                                count={5}
                                fillColor="#ffd700"
                                emptyColor="#ddd"
                                emptyIcon={<FaRegStar style={{ color: 'gray', fontSize: '20px' }} />}
                                fillIcon={<FaStar style={{ fontSize: '20px' }} />}
                                initialValue={Math.ceil(initialRating)}
                                onChange={handleRatingChange}
                                isHalf={false}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="review_text">Review Description</Label>
                        <Input
                            type="textarea"
                            name="review_text"
                            id="review_text"
                            value={reviewText}
                            onChange={handleReviewChange}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button style={{ backgroundColor: '#832729', borderColor: '#832729' }} onClick={handleReviewSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ReviewModal;
