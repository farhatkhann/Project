import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required'
    }
    if (!email) {
      newErrors.email = 'Email is required';
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';

    }
    else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Password and Confirm Password do not match'
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log('Register attempted with:', { name,email, password, confirmPassword });
    }
  };

  return (
    <div className='main-container-register'>
      <Container>
        <Row className="justify-content-md-center mt-5 login-wrapper">
          <Col xs={12} md={6} className='login-form-container'>
            <h2 className="text-center mb-4 text-uppercase login-title">Register</h2>
            <Form onSubmit={handleSubmit} className='login-form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-uppercase'>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-uppercase'>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='text-uppercase'>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='text-uppercase'>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password Again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="secondary" type="submit" className="w-100 login-button text-uppercase">
                Register
              </Button>
            </Form>
            Already have an account? <a href="/login">Login</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;