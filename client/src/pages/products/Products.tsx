import React, { useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import Product from "../../components/product/Product";
import type { IProductType } from "../../components/product/type";
import Button from "../../components/ui/buttons/button/Button";

function Products(): React.JSX.Element {
  const [products, setProducts] = useState<IProductType[] | []>([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts(): Promise<void> {
    const response = await $api.get("/products");
    if (response.status === 200) {
      setProducts(response.data);
    }
  }

  async function handleClick(id: number): Promise<void> {
    await $api.post("/busket", { product_id: id });
    await getProducts();
    alert("Товар добавлен в корзину!");
  }
  return (
    <>
      <div>Products</div>
      <div>
        {products.map((p) => {
          return (
            <li key={p.id}>
              <h1>Выбирай</h1>
              <Product product={p} />;
              <Button
                buttonText="Добавить в корзину"
                onClick={() => handleClick(p.id)}
              />
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Products;
