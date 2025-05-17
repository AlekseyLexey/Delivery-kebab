import React, { useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import Product from "../../components/product/Product";
import type { IProductType } from "../../components/product/type";
import Button from "../../components/ui/buttons/button/Button";
import "./products.scss"

function Products(): React.JSX.Element {
  const [products, setProducts] = useState<IProductType[]>([]);

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
    alert("ТОВАР ДОБАВЛЕН В КОРЗИНУ!");
  }

  return (
    <div className="products-container">
      <div className="crt-overlay"></div>
      <h1 className="products-title">ВЫБИРАЙТЕ ТОВАРЫ</h1>
      
      <div className="products-grid">
        {products.length === 0 ? (
          <p className="loading-message">ЗАГРУЗКА ТОВАРОВ...</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <Product product={p} />
              <Button
                buttonText="В КОРЗИНУ"
                onClick={() => handleClick(p.id)}
                className="retro-button primary"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;