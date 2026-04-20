import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import './AdminProduct.css';
import Navbarr from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    name: '',
    image: '',
    price_daily: '',
    price_weekly: '',
    price_monthly: '',
    quantity: '',
    category: '',
    description: '',
  });
  const [editIndex, setEditIndex] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product/getAll');
        console.log("All Data: ", res.data);
        const formatted = res.data.map(item => ({
          productId: item.product_id,            
          name: item.name,
          image: item.image,
          price_daily: item.price_daily,          
          price_weekly: item.price_weekly,
          price_monthly: item.price_monthly,
          quantity: item.quantity,
          category: item.category,
          description: item.description,
        }));
        setProducts(formatted);        
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);  

  // const handleAddOrUpdate = () => {
  //   const { name, image, price_daily, price_weekly, price_monthly, quantity, category } = form;
  //   if (!name || !image || !price_daily || !price_weekly || !price_monthly || !quantity || !category) return;

  //   if (editIndex !== null) {
  //     const updated = [...products];
  //     updated[editIndex] = form;
  //     setProducts(updated);
  //     setEditIndex(null);
  //   } else {
  //     setProducts([...products, form]);
  //   }

  //   setForm({
  //     productId: '',
  //     name: '',
  //     image: '',
  //     price_daily: '',
  //     price_weekly: '',
  //     price_monthly: '',
  //     quantity: '',
  //     category: '',
  //     description: '',
  //   });
  // };
  const handleAddOrUpdate = async () => {
    const { name, image, price_daily, price_weekly, price_monthly, quantity, category } = form;
    if (!name || !image || !price_daily || !price_weekly || !price_monthly || !quantity || !category) return;
  
    try {
      if (editIndex !== null) {
        const productToUpdate = products[editIndex];
        const res = await axios.put(`http://localhost:5000/api/product/update/${productToUpdate.productId}`, form);
        window.location.reload();
        console.log("Updated response: ",res.body);
        console.log("Updated response: ",res);
        const updated = [...products];
        updated[editIndex] = res.data;
        setProducts(updated);
        setEditIndex(null);
      } else {
        const res = await axios.post('http://localhost:5000/api/product/post', form);
        window.location.reload();
        console.log("Post response: ",res);

        setProducts([...products, res.data]);
      }
  
      setForm({
        productId: '',
        name: '',
        image: '',
        price_daily: '',
        price_weekly: '',
        price_monthly: '',
        quantity: '',
        category: '',
        description: '',
      });
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };
  
  const handleEdit = (index) => {
    setForm(products[index]);
    setEditIndex(index);
  };

  // const handleDelete = (index) => {
  //   const updated = products.filter((_, i) => i !== index);
  //   setProducts(updated);
  //   if (editIndex === index) {
  //     setEditIndex(null);
  //     setForm({
  //       productId: '',
  //       name: '',
  //       image: '',
  //       price_daily: '',
  //       price_weekly: '',
  //       price_monthly: '',
  //       quantity: '',
  //       category: '',
  //       description: '',
  //     });
  //   }
  // };
  const handleDelete = async (index) => {
    const productToDelete = products[index];
    try {
      await axios.delete(`http://localhost:5000/api/product/delete/${productToDelete.productId}`);
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
  
      if (editIndex === index) {
        setEditIndex(null);
        setForm({
          productId: '',
          name: '',
          image: '',
          price_daily: '',
          price_weekly: '',
          price_monthly: '',
          quantity: '',
          category: '',
          description: '',
        });
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // const columnStyle = { width: '120px', whiteSpace: 'nowrap' };
  const columnStyle = { width: '10%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  
  return (
    <>
      <Navbarr />
      <div className="admin-bg">
        <Container className="py-5">
          <Card className="p-4 admin-card">
            <h3 className="text-center mb-4 text-uppercase">Equipment Details</h3>
            <Form>
              <Row className="mb-3 gx-2 gy-3">
                {/* Row 1 */}
                <Col xs={12} md={3}>
                  <Form.Control
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    name="image"
                    placeholder="Product Image URL"
                    value={form.image}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    name="price_daily"
                    // type="number"
                    placeholder="Price (Daily)"
                    value={form.price_daily}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    name="price_weekly"
                    // type="number"
                    placeholder="Price (Weekly)"
                    value={form.price_weekly}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
              </Row>

              <Row className="mb-3 gx-2 gy-3">
                {/* Row 2 */}
                <Col xs={12} md={3}>
                  <Form.Control
                    name="price_monthly"
                    // type="number"
                    placeholder="Price (Monthly)"
                    value={form.price_monthly}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    name="quantity"
                    // type="number"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="modern-input"
                  />
                </Col>
              </Row>

              <Button variant="secondary" onClick={handleAddOrUpdate}>
                {editIndex !== null ? 'Update Product' : 'Add Product'}
              </Button>
            </Form>
            {products.length > 0 && (
              // <Table striped bordered hover responsive className="mt-4 text-center">
              //   <thead>
              //     <tr>
              //       <th>#</th>
              //       <th>Product Id</th>
              //       <th>Name</th>
              //       <th>Image</th>
              //       <th>Price Daily (₹)</th>
              //       <th>Price Weekly (₹)</th>
              //       <th>Price Monthly (₹)</th>
              //       <th>Quantity</th>
              //       <th>Category</th>
              //       <th>Description</th>
              //       <th>Actions</th>
              //     </tr>
              //   </thead>
              //   <tbody>
              //     {products.map((p, index) => (
              //       <tr key={index}>
              //         <td>{index + 1}</td>
              //         <td>{p.productId}</td>
              //         <td>{p.name}</td>
              //         <td>{p.image}</td>
              //         <td>{p.price_daily}</td>
              //         <td>{p.price_weekly}</td>
              //         <td>{p.price_monthly}</td>
              //         <td>{p.quantity}</td>
              //         <td>{p.category}</td>
              //         <td>{p.description}</td>
              //         <td>
              //           <Button
              //             variant="warning"
              //             size="sm"
              //             onClick={() => handleEdit(index)}
              //             className="me-2"
              //           >
              //             <EditIcon/>
              //           </Button>
              //           <Button
              //             variant="danger"
              //             size="sm"
              //             onClick={() => handleDelete(index)}
              //           >
              //             <DeleteIcon/>
              //           </Button>
              //         </td>
              //       </tr>
              //     ))}
              //   </tbody>
              // </Table>
//               <Table striped bordered hover responsive className="mt-4 text-center">
//   <thead>
//     <tr>
//       <th>#</th>
//       <th>Product Id</th>
//       <th style={columnStyle}>Name</th>
//       <th style={columnStyle}>Image</th>
//       <th style={columnStyle}>Price Daily (₹)</th>
//       <th style={columnStyle}>Price Weekly (₹)</th>
//       <th style={columnStyle}>Price Monthly (₹)</th>
//       <th style={columnStyle}>Quantity</th>
//       <th style={columnStyle}>Category</th>
//       <th style={columnStyle}>Description</th>
//       <th style={columnStyle}>Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     {products.map((p, index) => (
//       <tr key={index}>
//         <td>{index + 1}</td>
//         <td>{p.productId}</td>
//         <td style={columnStyle}>{p.name}</td>
//         <td style={columnStyle}>{p.image}</td>
//         <td style={columnStyle}>{p.price_daily}</td>
//         <td style={columnStyle}>{p.price_weekly}</td>
//         <td style={columnStyle}>{p.price_monthly}</td>
//         <td style={columnStyle}>{p.quantity}</td>
//         <td style={columnStyle}>{p.category}</td>
//         <td style={columnStyle}>{p.description}</td>
//         <td style={columnStyle}>
//           <Button
//             variant="warning"
//             size="sm"
//             onClick={() => handleEdit(index)}
//             className="me-2"
//           >
//             <EditIcon />
//           </Button>
//           <Button
//             variant="danger"
//             size="sm"
//             onClick={() => handleDelete(index)}
//           >
//             <DeleteIcon />
//           </Button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </Table>
<Container>
      <Table striped bordered hover className="mt-4 text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>#</th>
            <th style={{ width: '10%' }}>Product Id</th>
            <th style={columnStyle}>Name</th>
            <th style={columnStyle}>Image</th>
            <th style={columnStyle}>Price Daily (₹)</th>
            <th style={columnStyle}>Price Weekly (₹)</th>
            <th style={columnStyle}>Price Monthly (₹)</th>
            <th style={columnStyle}>Quantity</th>
            <th style={columnStyle}>Category</th>
            <th style={columnStyle}>Description</th>
            <th style={columnStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.productId}</td>
              <td>{p.name}</td>
              <td>{p.image}</td>
              <td>{p.price_daily}</td>
              <td>{p.price_weekly}</td>
              <td>{p.price_monthly}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(index)}
                  className="me-2"
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>

            )}
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AdminProduct;
