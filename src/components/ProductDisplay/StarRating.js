import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ ratings }) => {
    const stars = [];
    const fullStars = Math.floor(ratings);
    const hasHalfStar = ratings % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={solidStar} style={{ color: '#FFD700' }} />);
    }

    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key={fullStars} icon={regularStar} style={{ color: '#FFD700' }} />);
    }

    const emptyStars = 5 - Math.ceil(ratings);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon key={fullStars + (hasHalfStar ? 1 : 0) + i} icon={regularStar} style={{ color: '#C0C0C0' }} />);
    }

    return (
        <div style={{marginBottom:'5px'}}>
            {stars}
        </div>
    );
};

export default StarRating;
