import React from "react";
import type { IProductType } from "./type";

interface ProductProps {
  product: IProductType;
}

function Product({ product }: ProductProps): React.JSX.Element {
  return (
    <section>
      <div>
        <div>Название: {product.name}</div>

        <img
          src={`http://localhost:3000${product.imgURL}`}
          alt={product.name}
        />
        <div>
          Исходная цена: {Number(product.price).toLocaleString("ru-RU")} Руб{" "}
        </div>
        <div>Скидка: {product.discount}%</div>
        <div>
          Цена со скидкой: {Number(product.endPrice).toLocaleString("ru-RU")}{" "}
          Руб
        </div>
      </div>
    </section>
  );
}

export default Product;
