import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import NavbarPage from '../../components/Navbar/Navbar_Page';
import Footer from '../../components/Footer/footer';
import ProductDetail from './component/ProductDetail';
import ProductInfo from './component/ProductInfo';
import CustomerReview from './component/CustomerReview';
import VendorProduct from './component/VendorProduct';
import CategoryProduct from './component/CategoryProduct';
import { CartProvider } from '../cart/Context/CartContext';

const Loader = () => {
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner">Loading...</div>
            </div>
        </div>
    );
};

const Products = () => {
    const { product_id } = useParams();

    return (
        <React.Fragment>
            <Suspense fallback={<Loader />}>
                <NavbarPage />
                <div style={{ paddingTop: '50px', marginTop: '10px' }}>
                    <CartProvider>
                        <ProductDetail product_id={product_id} />
                    </CartProvider>
                </div>
                <div className="container">
                    <Row>
                        <Col md="6">
                            <ProductInfo product_id={product_id} />
                        </Col>
                        <Col md="6">
                            <CustomerReview product_id={product_id} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: '60px' }}>
                    <VendorProduct product_id={product_id} />
                    <CategoryProduct product_id={product_id} />
                </div>
                <Footer />
            </Suspense>
        </React.Fragment>
    );
};

export default Products;

