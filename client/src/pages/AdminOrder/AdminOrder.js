import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import Navbarr from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/order/get/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
    <Navbarr/>
    <Container className="py-4">
      <h2 className="mb-4">Admin Order Manager</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        orders.map(order => (
          <Card key={order.order_id} className="mb-4 shadow-sm">
            <Card.Header>
              <strong>Order ID:</strong> {order.order_id} &nbsp; | &nbsp;
              <strong>User ID:</strong> {order.user_id}
            </Card.Header>
            <Card.Body>
              <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
              <p><strong>Scheduled Date:</strong> {new Date(order.scheduled_date).toLocaleDateString()}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>

              <ListGroup variant="flush">
                {order.products.map((product, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>Product ID: {product.product_id}</Col>
                      <Col>Qty: {product.quantity}</Col>
                      <Col>Price: ₹{product.price}</Col>
                      <Col>Plan: {product.plan}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
    <Footer/>
    </>
  );
};

export default AdminOrder;
