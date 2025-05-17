import React, { useEffect } from "react";
import { orderSrvice } from "../../services/api/orderService";
import CourierOrderCard from "../../components/courierOrderCard/CourierOrderCard";
import Button from "../../components/ui/buttons/button/Button";
import { productService } from "../../services/api/productService";
import type { OrdersType } from "../../types/orderTypes";

interface CourierOrdersProps {
  orders: OrdersType;
  setOrders(orders: OrdersType): void;
}

const CourierOrders: React.FC<CourierOrdersProps> = ({ orders, setOrders }) => {
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

    Promise.all(updated).then(() => fetchingOrders());
  };

  return (
    <div className="courier-orders">
      <ul className="courier-orders__list">
        {!orders.length && <h2>Заказов сейчас нет...</h2>}
        {orders.map((order, index) => (
          <li key={index} className="courier-orders__item courier-order">
            <CourierOrderCard order={order} />
            <Button
              buttonText="Закрыть заказ"
              onClick={() => handleUpdate(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierOrders;
