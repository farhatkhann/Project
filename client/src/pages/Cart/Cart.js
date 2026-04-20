import React,{useState, useEffect} from 'react'
import Navbarr from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const Cart = () => {
    const [count, updateCount] = useState(1);
    const [show, setShow] = useState(false);
    const [cartItems, setCartItems] = useState([]);
const [userId, setUserId] = useState(null);
useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.user_id) {
            setUserId(user.user_id);
        }
    }
}, []);
useEffect(() => {
    if (userId) {
        axios.get(`http://localhost:5000/api/cart/items/${userId}`)
            .then((res) => {
                setCartItems(res.data); // make sure your backend returns an array of cart items
            })
            .catch((err) => {
                console.error("Error fetching cart items:", err);
            });
    }
}, [userId]);

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

    const handleCartDelete = async(productId) =>{
        try{
        const response= await axios.delete(`http://localhost:5000/api/cart/delete/${userId}/${productId}`);
        console.log(response);
        window.location.reload();
        }catch(err){
            console.log("error: ", err);
        }
    }

    const navigate = useNavigate();

    // const cartItems = [
    //   { name: 'Product A', price: 100, quantity: 2 },
    //   { name: 'Product B', price: 200, quantity: 1 },
    // ];
  
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("Total Price: ", totalPrice);
  
    const handleCheckout = () => {
      navigate('/order', {
        state: {
          cartItems,
          totalPrice
        }
      });
    };
  
    // return (
    //     <div>
    //         <Navbarr />
    //         <Container>
    //         {show ?
    //                 <>
    //                     <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    //                         <p>
    //                             You can only select upto 5 items.
    //                         </p>
    //                     </Alert>
    //                 </> : <></>
    //             }
    //             <Row>
    //                 <Col>
    //                     <div className="cart-container">
    //                         <h2 className='text-uppercase'>Your Cart</h2>
    //                         <div className='cart-button-container'>
    //                             <Link to='/product'><Button variant='outline-secondary' size='lg'>View Products</Button></Link>
    //                             <Link to='/checkout'><Button variant='secondary' size='lg'>Checkout</Button></Link>
    //                         </div>
    //                         <h5 className='cart-items-heading'>Cart Items(2)</h5>
    //                         <Row className='cart-product'>
    //                             <Col md='4'>
    //                                 <img src='\images\tractor.jpg' alt='product' className='cart-product' />
    //                             </Col>
    //                             <Col md='8'>
    //                                 <div className='product-details'>
    //                                 <p><b>Product : </b> Name of the product</p>
    //                                 <p><b>Id : </b> AGRO12345</p>
    //                                 <div className='itemContainer'>
    //                                     <button className='countButton' onClick={handleSubCount}><RemoveIcon style={{ fontSize: '35px' }} /></button>
    //                                     <h6 className='itemCount'>{count}</h6>
    //                                     <button className='countButton' onClick={handleAddCount}><AddIcon style={{ fontSize: '35px' }} /></button>
    //                                 </div>
    //                                 <Button variant='outline-secondary'><DeleteOutlineIcon/></Button>
    //                                 </div>
    //                             </Col>
    //                         </Row>
    //                         <hr/>
    //                         <Row className='cart-product'>
    //                             <Col md='4'>
    //                                 <img src='\images\tractor.jpg' alt='product' className='cart-product' />
    //                             </Col>
    //                             <Col md='8'>
    //                                 <div className='product-details'>
    //                                 <p><b>Product : </b> Name of the product</p>
    //                                 <p><b>Id : </b> AGRO12345</p>
    //                                 <div className='itemContainer'>
    //                                     <button className='countButton' onClick={handleSubCount}><RemoveIcon style={{ fontSize: '35px' }} /></button>
    //                                     <h6 className='itemCount'>{count}</h6>
    //                                     <button className='countButton' onClick={handleAddCount}><AddIcon style={{ fontSize: '35px' }} /></button>
    //                                 </div>
    //                                 <Button variant='outline-secondary'><DeleteOutlineIcon/></Button>
    //                                 </div>
    //                             </Col>
    //                         </Row>
    //                     </div>
    //                 </Col>
    //             </Row>
    //         </Container>
    //         <Footer />
    //     </div>
    // )
    return (
        <div>
            <Navbarr />
            <Container>
                {show && (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <p>You can only select up to 5 items.</p>
                    </Alert>
                )}
                <Row>
                    <Col>
                        <div className="cart-container">
                            <h2 className="text-uppercase">Your Cart</h2>
                            <div className="cart-button-container">
                                <Link to="/products">
                                    <Button variant="outline-secondary" size="lg">View Products</Button>
                                </Link>
                                <Button 
                                    variant="secondary" 
                                    size="lg" 
                                    disabled={cartItems.length === 0}
                                    style={{ marginLeft: '10px' }}
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </Button>
                            </div>
    
                            {cartItems.length === 0 ? (
                                <div className="empty-cart-message text-center mt-5">
                                    <h4>Your cart is empty 🛒</h4>
                                </div>
                            ) : (
                                <>
                                    <h5 className="cart-items-heading">Cart Items ({cartItems.length})</h5>
                                    {cartItems.map((item, index) => (
                                        <div key={index}>
                                            <Row className="cart-product">
                                                <Col md="4">
                                                    <img src={item.image} alt="product" className="cart-product" />
                                                </Col>
                                                <Col md="8">
                                                    <div className="product-details">
                                                        <p><b>Product:</b> {item.name}</p>
                                                        <p><b>ID:</b> {item.product_id}</p>
                                                        <p><b>Plan:</b> {item.plan}</p>
                                                        <p><b>Price:</b><span style={{color: "red"}}> ₹{item.price}</span></p>
                                                        {/* <div className="itemContainer">
                                                            <button className="countButton" onClick={handleSubCount}><RemoveIcon style={{ fontSize: '35px' }} /></button>
                                                            <h6 className="itemCount">{count}</h6>
                                                            <button className="countButton" onClick={handleAddCount}><AddIcon style={{ fontSize: '35px' }} /></button>
                                                        </div> */}
                                                        <Button variant="outline-secondary" onClick={()=>handleCartDelete(item.product_id)}><DeleteOutlineIcon /></Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
    
}

export default Cart

