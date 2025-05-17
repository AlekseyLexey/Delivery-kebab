import React, { useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import type { IProductType } from "../../components/product/type";
import Product from "../../components/product/Product";

function Orders(): React.JSX.Element {
  const [orders, setOrders] = useState<Array<IProductType> | []>([]);

  useEffect(() => {
    getOrdersFromBusket();
  }, []);

  async function getOrdersFromBusket(): Promise<void> {
    const response = await $api.get("/orders");
    if (response.status === 200) {
      setOrders(response.data);
    }
  }

  const activeOrders = orders.filter((order) => order?.status === "delivery");
  const completedOrders = orders.filter((order) => order?.status === "sold");

  return (
    <>
      <h1>Все ваши заказы</h1>

      <h2>Активные заказы</h2>
      <ul>
        {activeOrders.map((p: IProductType) => (
          <li key={p.id}>
            <h3>Заказ</h3>
            <Product product={p} />
          </li>
        ))}
      </ul>

      <h2>Завершенные заказы</h2>
      <ul>
        {completedOrders.map((p: IProductType) => (
          <li key={p.id}>
            <h3>Заказ</h3>
            <Product product={p} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Orders;
