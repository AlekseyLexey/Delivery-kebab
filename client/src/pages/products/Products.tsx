import React, { useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import Product from "../../components/product/Product";
import type { IProductType } from "../../components/product/type";

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
    alert("Товар добавлен в корзину!");
  }
  return (
    <>
      <div>Products</div>
      <div>
        {products.map((p) => {
          return <Product key={p.id} product={p} handleClick={handleClick} />;
        })}
      </div>
    </>
  );
}

export default Products;
