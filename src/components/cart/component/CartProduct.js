import React from 'react';
import { Card, CardBody, CardImg, Button, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbHeartShare } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from '../Context/CartContext';
import ApiConfig from '../../../config/ApiConfig';
import { Link } from 'react-router-dom';


const CartProduct = ({ cartItems, updateCartItems }) => {
  const { removeFromCart } = useCart();

  const handleRemoveFromCart = async (cartId) => {
    try {
      const response = await removeFromCart(cartId);
      if (response.success) {
        console.log(response.message);
        updateCartItems();
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error Removing product from Cart');
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedCartItems = cartItems.map((product) =>
      product.Product.product_id === productId ? { ...product, quantity: quantity } : product
    );
    cartItems = updatedCartItems;
  };

  const handleMoveToWishlist = (productId) => {
    console.log(`Moving product with ID ${productId} to wishlist`);
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
                    <Link to={`/product-details/${cartItem.Product.product_id}`} style={{color:'#832729'}}>
                      <label className='cart-product-name'>{cartItem.Product.product_name}</label>
                    </Link>
                    <span> <RiDeleteBin6Line style={{ fontSize: '20px' }} onClick={() => handleRemoveFromCart(cartItem.cart_id)} /> </span>
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label style={{ fontSize: '15px', fontWeight: '600', marginTop: '5px' }}>Qty:</label><br></br>
                      <select value={cartItem.quantity} onChange={(e) => handleQuantityChange(cartItem.Product.product_id, parseInt(e.target.value))} className='cart-qty'>
                        {[...Array(10).keys()].map((value) => (
                          <option key={value + 1} value={value + 1}>{value + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <Button className="cart-button" onClick={() => handleMoveToWishlist(cartItem.product.product_id)}>
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


