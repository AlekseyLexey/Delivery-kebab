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
import toast, { Toaster } from "react-hot-toast";
import type { OrdersType } from "../types/orderTypes";
import { orderSrvice } from "../services/api/orderService";

const userPath: IUserPath = {
  courier: "/profile",
  customer: "/products",
};

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [orders, setOrders] = useState<OrdersType>([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshReq()
      .then(({ user }) => handleLogIn(user))
      .catch(handleLogOut);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user?.role === "courier") {
      const timer = setInterval(async () => {
        const newOrders = await orderSrvice.getCourierOrders();

        const newOrderTotalItems = newOrders.map((o) => o.totalItems);
        const currentOrderTotalItems = orders.map((o) => o.totalItems);
        const hasNewOrders = newOrderTotalItems.some(
          (id) => !currentOrderTotalItems.includes(id)
        );

        if (hasNewOrders) {
          toast.success("Новый заказ!", {
            icon: "🚀",
            duration: 4000,
            position: "top-right",
          });
          setOrders(newOrders);
        }
      }, 2500);

      return () => clearInterval(timer);
    }
  }, [orders]);

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
        <Route
          path="/courier-orders"
          element={
            <CourierOrders
              setUser={setUser}
              orders={orders}
              setOrders={setOrders}
            />
          }
        />
        <Route path="/courier-products" element={<CourierProducts />} />
      </Routes>
      <Toaster position="top-right" />
    </UserContext.Provider>
  );
}

export default App;
