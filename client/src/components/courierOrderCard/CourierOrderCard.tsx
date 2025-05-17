import React from "react";
import type { IOrder } from "../../types/orderTypes";

interface ICourierOrderCard {
  order: IOrder;
}

const CourierOrderCard: React.FC<ICourierOrderCard> = ({ order }) => {
  const { username, phone, location } = order.customer;

  return (
    <>
      <h2 className="courier-order__buyer-name">Имя покупателя: {username}</h2>
      <div className="courier-order__buyer-phone">Телефон: {phone}</div>
      <div className="courier-order__buyer-location">{location}</div>
      <ul className="courier-order__products-list order-list">
        {order.products.map((p) => (
          <li key={p.id} className="order-list__item list-item">
            <h4 className="list-item__title">Продукт: {p.name}</h4>
            <div className="product-image-wrapper">
              <img src={`http://localhost:3000${p.imgURL}`} alt={p.name} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CourierOrderCard;
