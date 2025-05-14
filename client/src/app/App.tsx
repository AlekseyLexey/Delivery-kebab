import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Buscket from '../pages/buscket/Buscket';
import CourierOrders from '../pages/courierorders/CourierOrders';
import CourierProducts from '../pages/courierproducts/CourierProducts';
import NewProduct from '../pages/newproduct/NewProduct';
import Orders from '../pages/orders/Orders';
import Products from '../pages/products/Products';
import Profile from '../pages/profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Products />} /> */}
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buscket" element={<Buscket />} />
        <Route path="/courier-orders" element={<CourierOrders />} />
        <Route path="/courier-products" element={<CourierProducts />} />
      </Routes>
    </Router>
  );
}

export default App;