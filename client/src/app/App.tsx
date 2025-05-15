import { Routes, Route, useNavigate } from "react-router-dom";
import Buscket from "../pages/buscket/Buscket";
import CourierOrders from "../pages/courierorders/CourierOrders";
import CourierProducts from "../pages/courierproducts/CourierProducts";
import NewProduct from "../pages/newproduct/NewProduct";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import Profile from "../pages/profile/Profile";
import { useEffect, useState } from "react";
import Auth from "../pages/auth/Auth";
import type { IUser, IUserPath } from "../types/userTypes";
import { refreshReq } from "../services/api/authService";

const userPath: IUserPath = {
  courier: "/profile",
  customer: "/products",
};

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    refreshReq()
      .then(({ user }) => handleLogIn(user))
      .catch(handleLogOut);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogOut = () => {
    setUser(null);
  };

  const handleLogIn = (user: IUser) => {
    setUser(user);
    navigate(userPath[user.role]);
  };

  return (
    <Routes>
      <Route path="/auth" element={<Auth handleLogIn={handleLogIn} />} />
      <Route path="/products" element={<Products />} />
      <Route path="/new-product" element={<NewProduct />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/buscket" element={<Buscket />} />
      <Route path="/courier-orders" element={<CourierOrders />} />
      <Route path="/courier-products" element={<CourierProducts />} />
    </Routes>
  );
}

export default App;
