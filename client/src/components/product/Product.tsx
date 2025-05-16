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
        <div>Картинка: {product.imgURL} </div>
        <div>Исходная цена: {product.price} </div>
        <div>Скидка: {product.discount} </div>
        <div>Цена со скидкой: {product.endPrice} </div>
      </div>
    </section>
  );
}

export default Product;
