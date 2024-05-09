import React from 'react';
import { Card, CardBody, CardImg, Button, Row, Col } from 'reactstrap';
import { useSnackbar } from 'notistack';
import { TbHeartShare } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from '../Context/CartContext';
import ApiConfig from '../../../config/ApiConfig';
import { Link } from 'react-router-dom';
import axios from 'axios';



const CartProduct = ({ cartItems, updateCartItems }) => {
  const { removeFromCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveFromCart = async (cartId) => {
    try {
      const response = await removeFromCart(cartId);
      if (response.success) {
        console.log(response.message);
        updateCartItems();
      } else {
        console.error(response.message);
        enqueueSnackbar(response.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      enqueueSnackbar('Error Removing product from Cart', { variant: 'error' });
    }
  };
  
  const handleMoveToWishlist = async (cart_id) => {
    try {
      const response = await axios.post(`${ApiConfig.ApiPrefix}/cart-to-wishlist`, { cartItem_id: cart_id });
      if (response.status === 200) {
        console.log(response.data.message);
        updateCartItems(); 
      } else {
        console.error('Error moving product to wishlist:', response.data.error);
        enqueueSnackbar('Error moving product to wishlist', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error moving product to wishlist:', error);
      enqueueSnackbar('Error moving product to wishlist', { variant: 'error' });
    }
  };

  return (
    <div className="container">
      {cartItems.map((cartItem) => (
        <Card key={cartItem.product_id} className="mb-3" style={{ height: '200px', border: 'none' }}>
          <Row>
            <Col xs='4'>
              <Link to={`/product-details/${cartItem.Product.product_id}`}>
                <CardImg src={`${ApiConfig.cloudprefix}${cartItem.Product.p_images[0]}`} alt={cartItem.Product.product_name} style={{ height: '180px', width: '180px', padding: '10px', borderRadius: '20px' }} />
              </Link>
            </Col >
            <Col xs='8'>
              <CardBody style={{ padding: '5px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', color: '#832729', justifyContent: 'space-between', alignItems: 'center', marginTop: '7px' }}>
                    <Link to={`/product-details/${cartItem.Product.product_id}`} style={{ color: '#832729' }}>
                      <label className='cart-product-name'>{cartItem.Product.product_name}</label>
                    </Link>
                    <span> <RiDeleteBin6Line style={{ fontSize: '20px' }} onClick={() => handleRemoveFromCart(cartItem.cartItem_id)} /> </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }} className='text-muted'>Gold: {cartItem.Product.gold_type} | Weight: {cartItem.Product.weight}</label>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ marginTop: '5px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 'bold', alignItems: 'center' }}>₹{cartItem.Product.selling_price} </span>
                      <label style={{ marginLeft: '5px', fontSize: '13px', fontWeight: '600' }}>MRP</label>
                      <label className='text-muted' style={{ paddingLeft: '6px', textDecoration: 'line-through', fontSize: '13px', fontWeight: 'bold' }}>₹{cartItem.Product.mrp}</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' , marginTop:'5px',fontSize: '15px', fontWeight: '600'}}>
                      <label>Qty:</label>
                      <label style={{marginLeft:'2px'}}>{cartItem.quantity}</label>
                    </div>
                  </div>
                </div>
                <div>
                  <Button className="cart-button" onClick={() => handleMoveToWishlist(cartItem.cartItem_id)}>
                    <TbHeartShare style={{ fontSize: '20px' }} />
                    <label style={{ fontSize: '12px', textTransform: 'capitalize', paddingLeft: '3px' }}> Move to Wishlist </label>
                  </Button>
                </div>
              </CardBody>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default CartProduct;


