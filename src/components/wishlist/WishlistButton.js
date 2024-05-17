import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';

const WishlistButton = ({ product_id }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isAdded, setIsAdded] = useState(false);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        async function fetchWishlistItems() {
            if (!accessToken) {
                console.log('login first');
            }
            else {
                try {
                    const userID = localStorage.getItem('userId');
                    const response = await axios.get(`${ApiConfig.ApiPrefix}/wishlist/${userID}`);
                    const wishlistItems = response.data;
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

        }

        fetchWishlistItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product_id]);

    const addToWishlist = async () => {
        if (!accessToken) {
            enqueueSnackbar('Login to add product in Wishlist', { variant: 'error' });
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post(
                `${ApiConfig.ApiPrefix}/wishlist/add/${userId}`,
                {
                    product_id: product_id,
                }
            );

            if (response.status === 201) {
                setIsAdded(true);
                enqueueSnackbar('Product added to wishlist successfully', { variant: 'success' });
            } else {
                enqueueSnackbar('Failed to add product to Wishlist, try again later', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error.message);
            enqueueSnackbar('Failed to add product to Wishlist, try again later', { variant: 'error' });
        }
    };

    const removeFromWishlist = async () => {
        if (!accessToken) {
            enqueueSnackbar('Login to add product in Wishlist', { variant: 'error' });
            return;
        }

        try {
            const userId = localStorage.getItem('userId');

            const response = await axios.delete(
                `${ApiConfig.ApiPrefix}/wishlist/remove/${userId}`,
                { data: { product_id: product_id } }
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
