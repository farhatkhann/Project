// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
// import './OrderDetails.css';
// import Navbarr from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// const OrderDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems = [], totalPrice = 0 } = location.state || {};
//   const [orderConfirmed, setOrderConfirmed] = useState(false);
//   useEffect(() => {
//     if (orderConfirmed) {
//       const timer = setTimeout(() => {
//         navigate('/');
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [orderConfirmed, navigate]);

//   const handleConfirmOrder = () => {
//     setOrderConfirmed(true);
//   };

//   return (
//     <>
//     <Navbarr/>
//     <Container className="py-5">
//       <Card className="shadow-sm">
//         <Card.Header as="h4" className="bg-secondary text-white text-uppercase">
//           Order Summary
//         </Card.Header>
//         <Card.Body>
//           {orderConfirmed ? (
//              <div className="text-center">
//              <div className="tick-mark-animation">
//                <CheckCircleIcon style={{ fontSize: '80px', color: '#28a745' }} />
//              </div>
//              <h4 className="mt-4 text-success">Order Placed!</h4>
//              <p>You will be redirected to the home page shortly.</p>
//            </div>
//           ) : cartItems.length > 0 ? (
//             <>
//               <ListGroup variant="flush">
//                 {cartItems.map((item, index) => (
//                   <ListGroup.Item key={index}>
//                     <Row className="align-items-center">
//                       <Col xs={6}>
//                         <h6 className="mb-0">{item.name}</h6>
//                         <small>{item.quantity} × ₹{item.price}</small>
//                       </Col>
//                       <Col xs={6} className="text-end fw-semibold">
//                         ₹{item.quantity * item.price}
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>

//               <hr />
//               <Row className="justify-content-end">
//                 <Col xs="auto">
//                   <h5>Total: <span style={{color: "red"}}>₹{totalPrice}</span></h5>
//                   <p className="text-muted small mb-0">Inclusive of all taxes</p>
//                 </Col>
//               </Row>

//               <div className="text-center mt-4">
//                 <Button variant="success" size="lg" onClick={handleConfirmOrder}>
//                   Confirm Order
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-muted">No items in your cart.</p>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//     <Footer/>
//     </>
//   );
// };

// export default OrderDetails;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, ListGroup, Button, Form, Alert } from 'react-bootstrap';
import './OrderDetails.css';
import Navbarr from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0} = location.state || {};

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [address, setAddress] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [userId, setUserId] = useState(null);
  
      useEffect(() => {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
              try {
                  const user = JSON.parse(storedUser);
                  console.log("User: ", user);
                  if (user && user.user_id) {
                      setUserId(user.user_id);
                  }
              } catch (err) {
                  console.error("Error parsing stored user:", err);
              }
          }
      }, []);

  useEffect(() => {
    if (orderConfirmed) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderConfirmed, navigate]);

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/order/confirm-order', {
        user_id: userId,
        total_amount: totalPrice,
        scheduled_date: new Date().toISOString().split('T')[0],
        address,
        products: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          plan: item.plan
        }))
      });
      if (response.status === 200) {
        setOrderConfirmed(true);
        axios.delete(`http://localhost:5000/api/order/clear-cart/${userId}`);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <>
      <Navbarr />
      {showAlert && (
                  <Alert variant="danger" className='m-4' onClose={() => setShowAlert(false)} dismissible>
                    Please enter a delivery address before confirming your order.
                  </Alert>
                )}
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Header as="h4" className="bg-secondary text-white text-uppercase">
            Order Summary
          </Card.Header>
          <Card.Body>
            {orderConfirmed ? (
              <div className="text-center">
                <div className="tick-mark-animation">
                  <CheckCircleIcon style={{ fontSize: '80px', color: '#28a745' }} />
                </div>
                <h4 className="mt-4 text-success">Order Placed!</h4>
                <p>You will be redirected to the home page shortly.</p>
              </div>
            ) : cartItems.length > 0 ? (
              <>
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col xs={6}>
                          <h6 className="mb-0">{item.name}</h6>
                          <small>{item.quantity} × ₹{item.price}</small>
                        </Col>
                        <Col xs={6} className="text-end fw-semibold">
                          ₹{item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <hr />
                <Row className="justify-content-end">
                  <Col xs="auto">
                    <h5>Total: <span style={{ color: "red" }}>₹{totalPrice}</span></h5>
                    <p className="text-muted small mb-0">Inclusive of all taxes</p>
                  </Col>
                </Row>

                <Form.Group controlId="address" className="mt-4">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button variant="success" size="lg" onClick={handleConfirmOrder}>
                    Confirm Order
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted">No items in your cart.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default OrderDetails;

