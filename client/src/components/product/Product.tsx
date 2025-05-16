import React from "react";
import type { IProductType } from "./type";
import Button from "../ui/buttons/button/Button";

interface ProductProps {
  product: IProductType;
  handleClick: (id: number) => void;
}

function Product({ product, handleClick }: ProductProps): React.JSX.Element {
  return (
    <section>
      <h1>Выбирай</h1>
      <div>
        <div>Название: {product.name}</div>
        <div>Картинка: {product.imgURL} </div>
        <div>Исходная цена: {product.price} </div>
        <div>Скидка: {product.discount} </div>
        <div>Цена со скидкой: {product.endPrice} </div>
        <Button
          buttonText="Добавить в корзину"
          onClick={() => handleClick(product.id)}
        />
      </div>
    </section>
  );
}

export default Product;
