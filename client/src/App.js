import AboutUs from './pages/AboutUs/AboutUs';
import AdminOrder from './pages/AdminOrder/AdminOrder';
import AdminProduct from './pages/AdminProduct/AdminProduct';
import AllProducts from './pages/AllProducts/AllProducts';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import Product from './pages/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import Register from './pages/Register/Register';
// import UserDetails from './pages/User/User';
import User from './pages/User/User';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/user-details' element={<User/>}/>
          <Route path='/product/category/:category' element={<ProductList/>}/>
          <Route path='/product-dashboard' element={<AdminProduct/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/order' element={<OrderDetails/>}/>
          <Route path='/order-dashboard' element={<AdminOrder/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
