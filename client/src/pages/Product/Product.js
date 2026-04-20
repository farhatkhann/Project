import React, { useState, useEffect } from 'react';
import Navbarr from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Product.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Product = () => {
    const { productId } = useParams();
    const [count, updateCount] = useState(1);
    const [show, setShow] = useState(false);
    const [cartError, setCartError] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [product, setProduct] = useState({});
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:5000/api/product/getById/${productId}`);
    //             setProduct(res.data);
    //             console.log("Response Data:", res);
    //             console.log("Product: ", product);
    //         } catch (err) {
    //             console.error('Failed to fetch products:', err);
    //         }
    //     };
    //     fetchProducts();
    // }, [productId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product/getById/${productId}`);
                setProduct(res.data);
                console.log("Response Data:", res.data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };
        fetchProducts();
    }, [productId]);  // Only re-run if productId changes


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



    const handleAddCount = () => {
        if (count >= 5) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }
        else {
            updateCount(count + 1);
        }
    }
    const handleSubCount = () => {
        if (count === 1) {
            updateCount(1);
        }
        else {
            updateCount(count - 1);
        }
    }
    // const handleAddToCart = async () => {
    //     if (!selectedPlan) {
    //         setCartError(true);
    //         setTimeout(() => {
    //             setCartError(false);
    //         }, 5000);
    //     }
    //     else {
    //         setCartError(false);
    //         console.log("Selected Plan: ", selectedPlan);
    //     }
    //     try {
    //         // const response = await fetch(`/api/cart/add/${userId}`, {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     },
    //         //     body: JSON.stringify({
    //         //         product_id: productId, // replace with your actual product ID
    //         //         quantity: 1, // or dynamic based on user input
    //         //     }),
    //         // });

    //             const response = await axios.post(`/api/cart/add/${userId}`, {
    //                 product_id: productId, // replace with your actual product ID
    //                 quantity: count,           // or dynamic quantity
    //             });

    //         const data = await response.json();

    //         if (response.ok) {
    //             console.log("Added to cart:", data);
    //             // You can show a success message or update UI here
    //         } else {
    //             console.error("Add to cart failed:", data.message);
    //         }
    //     } catch (err) {
    //         console.error("Error calling AddToCart API:", err);
    //     }
    // }

    const handleAddToCart = async () => {
        if (!selectedPlan) {
            setCartError(true);
            setTimeout(() => {
                setCartError(false);
            }, 5000);
        } else {
            setCartError(false);
            console.log("Selected Plan: ", selectedPlan);
        }
        const plan = selectedPlan;
        console.log("Selected Plan: ", plan);
        let price = 0;
        if (plan === 'daily') price = product.price_daily;
        else if (plan === 'weekly') price = product.price_weekly;
        else if (plan === 'monthly') price = product.price_monthly;
        console.log("Selected Plan: ", plan);
        console.log("Selected Price: ", price);
        // return;
        try {
            const response = await axios.post(`http://localhost:5000/api/cart/add/${userId}`, {
                product_id: productId,
                quantity: count,
                price: price,
                plan: plan
            });
            // Log the entire response to check its structure
            console.log("Response Data:", response.data);

            if (response.status === 200) {
                console.log("Added to cart:", response.data.message); // This is where you access the message field
                // You can show a success message or update UI here
            } else {
                console.error("Add to cart failed:", response.data.message);
            }
        } catch (err) {
            console.error("Error calling AddToCart API:", err);
        }
    };



    return (
        <div>
            <Navbarr />
            <Container className='container'>
                {show ?
                    <>
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <p>
                                You can only select upto 5 items.
                            </p>
                        </Alert>
                    </> : <></>
                }
                {cartError ?
                    <>
                        <Alert variant="danger" onClose={() => setCartError(false)} dismissible>
                            <p>
                                Please select a plan before adding to the cart!
                            </p>
                        </Alert>
                    </> : <></>
                }
                {product && (
                    <Row>
                        <Col xs={12} md={6}>
                            <img src={product.image} alt='product-img' />
                        </Col>
                        <Col xs={12} md={6}>
                            <div className='details'>
                                <h4 className='text-uppercase productTitle'>{product.name}</h4>
                                <div>
                                </div>
                                <h6 className='title-heading'>Price Details</h6>
                                <div className='priceDetails'>
                                    <button
                                        className={selectedPlan === 'daily' ? 'active' : ''}
                                        onClick={() => setSelectedPlan(prev => prev === 'daily' ? '' : 'daily')}
                                    >
                                        Daily<br /><span className='price'>₹ {product.price_daily}</span>
                                    </button>
                                    <button
                                        className={selectedPlan === 'weekly' ? 'active' : ''}
                                        onClick={() => setSelectedPlan(prev => prev === 'weekly' ? '' : 'weekly')}
                                    >
                                        Weekly<br /><span className='price'>₹ {product.price_weekly}</span>
                                    </button>
                                    <button
                                        className={selectedPlan === 'monthly' ? 'active' : ''}
                                        onClick={() => setSelectedPlan(prev => prev === 'monthly' ? '' : 'monthly')}
                                    >
                                        Monthly<br /><span className='price'>₹ {product.price_monthly}</span>
                                    </button>
                                </div>

                                <h6 className='title-heading'>Quantity</h6>
                                <div className='itemContainer'>
                                    <button className='countButton' onClick={handleSubCount}><RemoveIcon style={{ fontSize: '35px' }} /></button>
                                    <h6 className='itemCount'>{count}</h6>
                                    <button className='countButton' onClick={handleAddCount}><AddIcon style={{ fontSize: '35px' }} /></button>
                                </div>
                                <Button variant='secondary' size='lg' className='text-uppercase' onClick={() => handleAddToCart()}>Add to Cart</Button>
                            </div>
                        </Col>
                        <div>
                            <h6 className='title-heading'>Equipment Description</h6>
                            <p className='desc'>
                                {product.description}
                            </p>
                        </div>
                        <h5 className='text-uppercase productTitle'>Terms And Conditions</h5>
                        <p className='termsAndConditions'>
                            1. The equipment is rented exclusively for agricultural use. <br />
                            2. The renter is responsible for the equipment from delivery to return. <br />
                            3. Equipment must be returned in the same condition as rented; damages may result in additional charges. <br />
                            4. Late returns are subject to penalties as per company policy. <br />
                            5. In case of damage, loss, or theft, the renter must cover repair or replacement costs. <br />
                            6. Cancellations made less than 24 hours before the rental start date may incur charges. <br />
                            7. Proper and safe operation of the equipment is mandatory. <br />
                            8. Ownership of all equipment remains with Equi Roots. <br />
                        </p>
                    </Row>
                )}
            </Container>
            <Footer />
        </div>
    )
}

export default Product;


