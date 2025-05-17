import React, { useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import type { IProductType } from "../../components/product/type";
import Product from "../../components/product/Product";
import "./orders.scss"

function Orders(): React.JSX.Element {
  const [orders, setOrders] = useState<IProductType[]>([]);

  useEffect(() => {
    getOrdersFromBusket();
  }, []);

  async function getOrdersFromBusket(): Promise<void> {
    const response = await $api.get("/orders");
    if (response.status === 200) {
      setOrders(response.data);
    }
  }

  return (
    <div className="orders-container">
      <div className="crt-overlay"></div>
      <h1 className="orders-title">ВАШИ ЗАКАЗЫ</h1>
      
      <div className="orders-list">
        {orders.length === 0 ? (
          <p className="empty-message">ЗАКАЗОВ ПОКА НЕТ</p>
        ) : (
          orders.map((p: IProductType) => (
            <div key={p.id} className="order-item">
              <h2>ЗАКАЗ #{p.id}</h2>
              <Product product={p} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;