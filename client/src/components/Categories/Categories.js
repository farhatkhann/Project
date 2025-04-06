import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { categories } from '../../data';
import './Categories.css';

const Categories = () => {
  return (
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={12} md={4} className="mb-2 g-2">
            <div className="category-card text-white text-uppercase">
              <Card.Img src={category.image} alt={category.name} className="category-img" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center overlay-bg">
                <h3 className="fw-bold">{category.name}</h3>
                <Button variant="light fw-bold" className="mt-2 text-uppercase">Get Now</Button>
              </Card.ImgOverlay>
            </div>
          </Col>
        ))}
      </Row>
  );
};

export default Categories;
