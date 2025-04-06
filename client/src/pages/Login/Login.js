import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css';
const Login=()=>{ 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log('Login attempted with:', { email, password });
    }
  };

  return (
    <div className='main-container-login'>
    <Container>
      <Row className="justify-content-md-center mt-5 login-wrapper">
        <Col xs={12} md={6} className='login-form-container'>
          <h2 className="text-center mb-4 text-uppercase login-title">Sign In</h2>
          <Form onSubmit={handleSubmit} className='login-form'>
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

            <Button variant="secondary" type="submit" className="w-100 login-button text-uppercase">
              Sign In
            </Button>
          </Form>
          Create new account! <a href="/register">Register</a>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Login;