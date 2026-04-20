import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { categories } from '../../data';
import './Categories.css';
import { Link } from 'react-router-dom';
const Categories = () => {
  return (
    <Row>
      {categories.map((category) => (
        <Col key={category.id} sm={12} md={4} className="mb-2 g-2">
          {/* <div className="page-card-category text-white text-uppercase">
              <Card.Img src={category.image} alt={category.name} className="page-image-category" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center overlay-bg">
                <h3 className="fw-bold">{category.name}</h3>
                <Link to={`/product/category/${category.name.toLowerCase()}`}><Button variant="light fw-bold" className="mt-2 text-uppercase">Get Now</Button></Link>
              </Card.ImgOverlay>
            </div> */}
          <div className="page-card-category text-white text-uppercase">
            <img src={category.image} alt={category.name} className="page-image-category" />
            <div className="overlay-bg d-flex flex-column justify-content-center align-items-center">
              <h3 className="fw-bold">{category.name}</h3>
              <Link to={`/product/category/${category.name.toLowerCase()}`}>
                <Button variant="light fw-bold" className="mt-2 text-uppercase">Get Now</Button>
              </Link>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Categories;
