// import React from 'react'
// import './Navbar.css';
// import SearchIcon from '@mui/icons-material/Search';
// import { Badge } from '@mui/material';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// const Navbarr = () => {
//   const handleLogout = async() =>{
//     const response = await axios.post("http://localhost:5000/api/auth/logout");
//     localStorage.removeItem('user');
//     console.log("Response: ", response);
//   }
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
//       <Container fluid>
//         <Navbar.Brand href="/" className='text-uppercase'>
//           <img src='/images/logo.png' alt='logo' className='imageLogo' />
//           Equi Roots
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="/register">REGISTER</Nav.Link>
//             <Nav.Link href="/login">SIGN IN</Nav.Link>
//           </Nav>
//           <Link to='/cart'>
//             <div className="me-3 d-flex align-items-center">
//               <Badge badgeContent={4} color="primary">
//                 <ShoppingCartOutlinedIcon className="cart-icon" />
//               </Badge>
//             </div>
//           </Link>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-secondary" className='search-btn'><SearchIcon style={{ fontSize: '20px' }} className='search-icon' /></Button>
//           </Form>
//           <div className='user-account'>
//             <NavDropdown title={<AccountCircleIcon />} id="basic-nav-dropdown" align="end">
//               {/* Dropdown items here */}
//               <NavDropdown.Item href="/user-details">Profile</NavDropdown.Item>
//               {/* <NavDropdown.Item href="#action2">Settings</NavDropdown.Item> */}
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="/login" onClick={handleLogout}>Logout</NavDropdown.Item>
//             </NavDropdown>
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navbarr;


import React, { useEffect, useState } from 'react';
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbarr = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };
//   const [cartItems, setCartItems] = useState([]);
//   useEffect(() => {
//     if (user.id) {
//         axios.get(`http://localhost:5000/api/cart/items/${user.id}`)
//             .then((res) => {
//                 setCartItems(res.data); // make sure your backend returns an array of cart items
//             })
//             .catch((err) => {
//                 console.error("Error fetching cart items:", err);
//             });
//     }
// }, [user.id]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="/" className='text-uppercase'>
          <img src='/images/logo.png' alt='logo' className='imageLogo' />
          Equi Roots
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {!user && (
              <>
                <Nav.Link href="/register">REGISTER</Nav.Link>
                <Nav.Link href="/login">SIGN IN</Nav.Link>
              </>
            )}
          </Nav>
          <Link to='/cart'>
            <div className="me-3 d-flex align-items-center">
              {/* <Badge badgeContent={cartItems.length} color="primary"> */}
                <ShoppingCartOutlinedIcon className="cart-icon" />
              {/* </Badge> */}
            </div>
          </Link>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" className='search-btn'>
              <SearchIcon style={{ fontSize: '20px' }} className='search-icon' />
            </Button>
          </Form>

          {user && (
            <div className='user-account'>
              <NavDropdown
                title={
                  <span>
                    <AccountCircleIcon /> <span className="ms-2">Hi,{user.username}</span>
                  </span>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                {/* <NavDropdown.Item href="/">Hi, {user.username}</NavDropdown.Item> */}
                <NavDropdown.Item href="/user-details">Profile</NavDropdown.Item>
                {user.isAdmin && (
                  <>
                  <NavDropdown.Item href="/product-dashboard">Manage Products</NavDropdown.Item>
                  <NavDropdown.Item href="/order-dashboard">Manage Orders</NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;


