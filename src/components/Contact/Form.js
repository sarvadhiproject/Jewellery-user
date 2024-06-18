import React, { useState } from "react";
import { Button, Input, Form, FormGroup, Row, Col } from "reactstrap";
import axios from "axios";
import { Rating } from 'react-simple-star-rating';
import ApiConfig from "../../config/ApiConfig";
import { FaRegStar, FaStar } from "react-icons/fa";

const FormWebsiteReview = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    ratings: 0,
    review_text: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rate) => {
    setFormData({ ...formData, ratings: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiConfig.ApiPrefix}/website-reviews/add`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Row>
          <Col style={{marginLeft:'3px'}}>
            <Input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Col>
          <Col style={{display:'flex', justifyContent:'center'}}>
            <Rating
              fillColor="#832729"
              emptyColor="#ddd"
              emptyIcon={<FaRegStar style={{ color: 'gray', fontSize: '35px' }} />}
              fillIcon={<FaStar style={{ fontSize: '35px' }} />}
              initialValue={formData.ratings}
              onClick={handleRatingChange}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          name="review_text"
          placeholder="Your Review...."
          value={formData.review_text}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button type="submit" className="website-review">
        Submit Review
      </Button>
    </Form>
  );
};

export default FormWebsiteReview;