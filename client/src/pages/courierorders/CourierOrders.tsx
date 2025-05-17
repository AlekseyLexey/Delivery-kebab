import React, { useEffect } from "react";
import { orderSrvice } from "../../services/api/orderService";
import CourierOrderCard from "../../components/courierOrderCard/CourierOrderCard";
import Button from "../../components/ui/buttons/button/Button";
import { productService } from "../../services/api/productService";
import type { OrdersType } from "../../types/orderTypes";
import "./courierorders.scss";
import { userService } from "../../services/api/userService";
import type { IUser } from "../../types/userTypes";

interface CourierOrdersProps {
  orders: OrdersType;
  setOrders(orders: OrdersType): void;
  setUser(user: IUser): void;
}

const CourierOrders: React.FC<CourierOrdersProps> = ({
  orders,
  setOrders,
  setUser,
}) => {
  useEffect(() => {
    fetchingOrders();
  }, []);

  const fetchingOrders = async (): Promise<void> => {
    const products = await orderSrvice.getCourierOrders();
    setOrders(products);
  };

  const handleUpdate = async (id: number): Promise<void> => {
    const updated = orders[id].products.map(
      async (product) =>
        await productService.update(product.id, { status: "sold" })
    );

    Promise.all(updated)
      .then(() => {
        fetchingOrders();
        return userService.update({ wallet: String(orders[id].totalAmount) });
      })
      .then(setUser);
  };

  return (
    <div className="courier-orders">
      <div className="crt-overlay"></div>
      <h1>АКТИВНЫЕ ЗАКАЗЫ</h1>

      <ul className="courier-orders__list">
        {!orders.length ? (
          <h2 className="no-orders">ЗАКАЗОВ СЕЙЧАС НЕТ...</h2>
        ) : (
          orders.map((order, index) => (
            <li key={index} className="courier-orders__item courier-order">
              <CourierOrderCard order={order} />
              <Button
                buttonText="ЗАКРЫТЬ ЗАКАЗ"
                onClick={() => handleUpdate(index)}
                className="retro-button danger"
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CourierOrders;
