import React, { useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import type { IProductType } from "../../components/product/type";
import Product from "../../components/product/Product";
import "./orders.scss";

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

  const activeOrders = orders.filter((order) => order?.status === "delivery");
  const completedOrders = orders.filter((order) => order?.status === "sold");

  return (
    <div className="orders-container">
      <div className="crt-overlay"></div>

      <h1 className="orders-title">ВАШИ ЗАКАЗЫ</h1>

      <div className="orders-section">
        <h2 className="section-title active">АКТИВНЫЕ ЗАКАЗЫ</h2>
        {activeOrders.length > 0 ? (
          <div className="orders-grid">
            {activeOrders.map((p: IProductType) => (
              <div key={p.id} className="order-card">
                <Product product={p} />
                <div className="order-status active">ДОСТАВКА</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">НЕТ АКТИВНЫХ ЗАКАЗОВ</p>
        )}
      </div>

      <div className="orders-section">
        <h2 className="section-title completed">ЗАВЕРШЕННЫЕ ЗАКАЗЫ</h2>
        {completedOrders.length > 0 ? (
          <div className="orders-grid">
            {completedOrders.map((p: IProductType) => (
              <div key={p.id} className="order-card">
                <Product product={p} />
                <div className="order-status completed">ЗАВЕРШЕН</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">НЕТ ЗАВЕРШЕННЫХ ЗАКАЗОВ</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
