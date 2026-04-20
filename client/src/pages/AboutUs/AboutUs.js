import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AboutUs.css';
import Navbarr from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AboutUs = () => {
    return (
        <>
        <Navbarr />
        <div className="about-us-section">
            <Container>
                <Row className="justify-content-center text-center mb-5">
                    <Col lg={8}>
                        <h1 className="about-title">About Us</h1>
                        <p className="about-subtitle">
                            We are committed to providing the best agricultural equipment for modern farming needs.
                        </p>
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col md={6}>
                        <img
                            src="/images/login.jpg"
                            alt="Tractor in field"
                            className="img-fluid about-image"
                        />
                    </Col>
                    <Col md={6}>
                        <h3 className="section-heading">Who We Are</h3>
                        <p className="about-text">
                            Founded in 2025, our company has been serving farmers across the country with top-quality equipment
                            that enhances productivity and reliability. We understand the needs of modern agriculture and
                            continually innovate to support our community.
                        </p>
                    </Col>
                </Row>

                <Row className="align-items-center mt-5">
                    <Col md={6} className="order-md-2">
                        <img
                            src="/images/harvester.jpg"
                            alt="Farming"
                            className="img-fluid about-image"
                        />
                    </Col>
                    <Col md={6} className="order-md-1">
                        <h3 className="section-heading">Our Mission</h3>
                        <p className="about-text">
                            To empower farmers with affordable and reliable equipment while ensuring exceptional service
                            and support. We aim to be a trusted partner in every field and season.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
        <Footer />
        </>
    );
};

export default AboutUs;
