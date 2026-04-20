import React, { useState, useEffect } from 'react';
import Navbarr from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link} from 'react-router-dom';
// import './ProductList.css';
import axios from "axios";
import "./AllProducts.css";
const AllProducts = () => {
//   const { category } = useParams(); // from route like /product/category/:category
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product/getAll');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  });
  return (
    <div>
      <Navbarr />
      {/* <Row>
        <Col className="d-flex justify-content-end">
          <Link to='/products'>
          <Button variant="outline-secondary" className="m-4"size='lg'>
            Show All Products
          </Button>
          </Link>
        </Col>
      </Row> */}
      <Row className='row'>
        {products.map((product) => (
          <Col key={product.id} md={3} className='mb-4'>
            <Card style={{ width: '100%'}} className='main-card'>
              <Card.Img variant="top" src={product.image} className='main-card-img'/>
              <Card.Body className='main-card-body'>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className='main-card-desc'>
                  {product.description}
                </Card.Text>
                <Link to={`/product/${product.product_id}`}><Button variant="secondary">View Product</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
};

export default AllProducts;