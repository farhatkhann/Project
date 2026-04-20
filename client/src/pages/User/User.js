import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import './User.css';
import Footer from '../../components/Footer/Footer';
import Navbarr from '../../components/Navbar/Navbar';

const User = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: '',
    phone: '',
    address: '',
    equipment: '',
    notes: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(prev => ({
        ...prev,
        name: parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        addres: parsedUser.address || '',
        equipment: parsedUser.equipment || '',
        notes: parsedUser.notes || ''
      }));
    }
  }, []);


  const handleChange = (field, value) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Navbarr />
      <div className="user-bg">
        <Container className="user-details-container py-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="p-4 user-card border-0">
                <Card.Title className="text-center mb-4 fs-3 fw-bold text-dark text-uppercase">
                  User Details
                </Card.Title>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={userDetails.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="modern-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={userDetails.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="modern-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark fw-semibold">Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      value={userDetails.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="modern-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark fw-semibold">Order Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Enter your address"
                      value={userDetails.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="modern-input"
                    />
                  </Form.Group>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default User;
