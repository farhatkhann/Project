import React from 'react'
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// const Navbar = () => {
//   return (
//     <div className='container'>
//       <div className='wrapper'>
//         <div className='left'>
//           <span className='language'>EN</span>
//         <div className='searchContainer'>
//             <input placeholder='Search...' className='input' />
//             <SearchIcon style={{color:'gray', fontSize:'16px'}}/>
//           </div>
//         </div>
//         <div className='center'>
//         <h1 className='logo'>
//             EQUIP ROOTS
//           </h1>
//         </div>
//         <div className='right'>
//           <div className='menuItem'>
//             REGISTER
//           </div>
//           <div className='menuItem'>
//             SIGN IN
//           </div>
//           <div className='menuItem'>
//             <Badge badgeContent={4} color='primary'>
//               <ShoppingCartOutlinedIcon/>
//             </Badge>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar;


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbarr=()=> {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="/" className='text-uppercase'>Equip Roots</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/register">REGISTER</Nav.Link>
            <Nav.Link href="/login">SIGN IN</Nav.Link>
          </Nav>
          <div className="cart-container me-3 d-flex align-items-center">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon className="cart-icon" />
            </Badge>
          </div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" className='search-btn'><SearchIcon style={{ fontSize: '20px' }} className='search-icon' /></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;