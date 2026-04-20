import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './Register.css';
const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  // const [inputs, setInputs] = ({
  //   username : "",
  //   email: "",
  //   phone: "",
  //   password: "",
  // })
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Name is required'
    }
    if (!email) {
      newErrors.email = 'Email is required';
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone No. is required';
    }
    else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone No. is invalid';
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

  // const handleChange = (e) =>{
  //   setInputs{(prev) => ({...prev, [e.target.name]: e.target.value})};
  // }
  // console.log(inputs);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      console.log('Register attempted with:', { username, email, phone, password, confirmPassword });
      try{
        axios.post("http://localhost:5000/api/auth/register",{
          username,
          email,
          phone,
          password,
        })
      }catch(err){
        console.log(err);
        setErrors(errors.response.data);
      }
      navigate('/login');
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
                  value={username}
                  name='username'
                  onChange={(e) => setUserName(e.target.value)}
                  isInvalid={!!errors.username}
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
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-uppercase'>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Phone No."
                  value={phone}
                  name='phone'
                  maxLength={10}
                  // onChange={(e) => setPhone(e.target.value)}
                  isInvalid={!!errors.phone}
                  onChange={(e) => {
                    const cleanedValue = e.target.value.replace(/\D/g, ''); // Remove anything that's not a digit
                    setPhone(cleanedValue);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='text-uppercase'>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  name='password'
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