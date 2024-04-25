import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardText, Button, Row, Col } from 'reactstrap';
import gemstone from "../../assets/images/bestseller/gemstone-rings.jpg";
import moon from "../../assets/images/bestseller/moon-choker.jpg";



const CartProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Intertwining Leaves Rose Gold and Diamond Finger Ring',
      weight: '1.436 g',
      size: '16.40 MM',
      price: 29863,
      imageUrl: gemstone,
    },
    {
      id: 2,
      name: 'Wedding Bands',
      weight: '5 grams',
      size: 'Ring Size: 5',
      price: 780,
      imageUrl: moon,
    },
  ]);

  const handleRemoveFromCart = (productId) => {
    console.log(`Removing product with ID ${productId} from cart`);
    // Add your logic to remove the product from the cart
    // For example:
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleMoveToWishlist = (productId) => {
    console.log(`Moving product with ID ${productId} to wishlist`);
    // Add your logic to move the product to the wishlist
  };

  return (
    <div className="container">
      {products.map((product) => (
        <Card key={product.id} className="mb-3" style={{height:'220px'}}>
          <Row>
            <Col xs="3">
              <CardImg  src={product.imageUrl} alt={product.name} style={{height:'220px', width:'220px'}} />
            </Col>
            <Col xs="9">
              <CardBody style={{padding:'5px'}}>
                <CardText>
                  <h3>{product.name}</h3>
                  <p>Weight: {product.weight}</p>
                  <p>Size: {product.size}</p>
                  <p>Price: ₹{product.price}</p>
                </CardText>
                <div>
                  <Button color="danger" onClick={() => handleRemoveFromCart(product.id)}>
                    Remove
                  </Button>
                  <Button color="primary" onClick={() => handleMoveToWishlist(product.id)} className="ml-2">
                    Move to Wishlist
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