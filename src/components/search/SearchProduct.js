import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import { Card, Col, Row, CardImg, CardBody } from 'reactstrap';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiConfig.ApiPrefix}/products/search?q=${query}`);
        if (response.data && Array.isArray(response.data)) {
          const searchProducts = response.data.map((product) => ({
            ...product,
            p_images: Array.isArray(product.p_images) ? product.p_images.map(image => `${ApiConfig.cloudprefix}` + image) : []
          }));
          setSearchResults(searchProducts);
        } else {
          console.error("Response data is not an array:", response.data);
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError(true);
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching search results.</div>;
  }

  return (
    <div className='container' style={{ padding: '20px 0px 20px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Row>
        {searchResults.map((product) => (
          <Col className='col' key={product.product_id} style={{ marginBottom: '20px' }}>
            <Card className='product-card'>
              <Link to={`/product-details`} state={{ product_id: product.product_id, product_name: product.product_name }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative' }}>
                  {product.p_images && product.p_images.length > 0 && (
                    <CardImg
                      top
                      src={product.p_images[0]}
                      alt={product.product_name}
                      className="product-card-img"
                    />
                  )}
                </div>
                <CardBody style={{ padding: '10px' }}>
                  <div className='product-cardbody-div'>
                    <p className='product-names'>{product.product_name}</p>
                    <span style={{ marginTop: '10px', display: 'flex' }}>
                      <p>&#8377;{product.selling_price}</p>
                      <label className='text-muted' style={{ marginLeft: '5px', fontSize: '12px', marginTop: '2px' }}> MRP</label>
                      <p className='text-muted' style={{ textDecoration: 'line-through', marginLeft: '5px', fontSize: '12px', marginTop: '2px' }}>&#8377;{product.mrp}</p>
                    </span>
                  </div>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchResults;