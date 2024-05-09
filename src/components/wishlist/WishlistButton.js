import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';

const WishlistButton = ({ product_id }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isAdded, setIsAdded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlistItems() {
            try {
                const userID = localStorage.getItem('userId');
                const response = await axios.get(`${ApiConfig.ApiPrefix}/wishlist/${userID}`);
                const wishlistItems = response.data.wishlistItems;
                if (wishlistItems && wishlistItems.length > 0) {
                    setIsAdded(wishlistItems.some(item => item.product_id === product_id));
                } else {
                    setIsAdded(false);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setLoading(false);
            }
        }

        fetchWishlistItems();
    }, [product_id]);

    const addToWishlist = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            enqueueSnackbar('Login to add product in Wishlist', { variant: 'error' });
            return;
        }

        try {
            const userid = localStorage.getItem('userId');

            const response = await axios.post(
                `${ApiConfig.ApiPrefix}/add-to-wishlist`,
                {
                    user_id: userid,
                    product_id: product_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setIsAdded(true);
                enqueueSnackbar('Product added to wishlist successfully', { variant: 'success' });
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error.message);
            enqueueSnackbar('Error adding product to wishlist', { variant: 'error' });
        }
    };

    const removeFromWishlist = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            enqueueSnackbar('Login to add product in Wishlist', { variant: 'error' });
            return;
        }

        try {
            const userid = localStorage.getItem('userId');

            const response = await axios.post(
                `${ApiConfig.ApiPrefix}/remove-from-wishlist`,
                {
                    user_id: userid,
                    product_id: product_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setIsAdded(false);
                enqueueSnackbar('Product removed from wishlist successfully', { variant: 'success' });
                document.dispatchEvent(new CustomEvent('removeFromWishlist', { detail: { productId: product_id } }));
            }
        } catch (error) {
            console.error('Error removing product from wishlist:', error.message);
            enqueueSnackbar('Error removing product from wishlist', { variant: 'error' });
        }
    };

    if (loading) {
        return null;
    }

    return (
        <>
            <button className="wishlist-button" onClick={isAdded ? removeFromWishlist : addToWishlist} style={{ zIndex: 1 }}>
                {isAdded ? (
                    <FaHeart style={{ marginRight: '0px', fontSize: '17px', color: '#832729' }} />
                ) : (
                    <FaRegHeart style={{ marginRight: '0px', fontSize: '17px', color: '#832729' }} />
                )}
            </button>
        </>
    );
};

export default WishlistButton;
