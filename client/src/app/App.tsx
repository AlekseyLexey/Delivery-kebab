import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Auth,
  Buscket,
  CourierOrders,
  CourierProducts,
  NewProduct,
  Orders,
  Products,
  Profile,
} from "../pages/index";
import { useEffect, useState } from "react";
import type { IUser, IUserPath } from "../types/userTypes";
import { refreshReq, logoutReq } from "../services/api/authService";
import { UserContext } from "./UserContex";
import Header from "../components/header/Header";

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

  const handleLogOut = async (): Promise<void> => {
    await logoutReq();
    setUser(null);
    navigate("/auth");
  };

  const handleLogIn = (user: IUser): void => {
    setUser(user);
    navigate(userPath[user.role]);
  };

  return (
    <UserContext.Provider value={{ user, handleLogOut, handleLogIn, setUser }}>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buscket" element={<Buscket />} />
        <Route path="/courier-orders" element={<CourierOrders />} />
        <Route path="/courier-products" element={<CourierProducts />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
