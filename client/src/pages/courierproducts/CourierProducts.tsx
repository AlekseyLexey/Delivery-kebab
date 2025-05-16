
import React, { useEffect, useState } from "react";
import type { IProductType } from "../../components/product/type";
import { productService } from "../../services/api/productService";
import Product from "../../components/product/Product";
import Button from "../../components/ui/buttons/button/Button";
import { useNavigate } from "react-router-dom";

const CourierProducts: React.FC = () => {
  const [products, setProducts] = useState<Array<IProductType> | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchingProducts();
  }, []);

  const fetchingProducts = async (): Promise<void> => {
    try {
      const products = await productService.getCourierProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await productService.delete(id);
      await fetchingProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="courier-products" style={{ padding: "20px" }}>
      <Button 
        buttonText="Добавить новый товар" 
        onClick={() => navigate("/new-product")}
        style={{ marginBottom: "20px" }}
      />
      <ul className="courier-products__list" style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li 
            className="courier-products__item" 
            key={p.id}
            style={{ 
              border: "1px solid #ddd", 
              borderRadius: "8px", 
              padding: "15px", 
              marginBottom: "15px" 
            }}
          >
            <Product product={p} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button 
                buttonText="Удалить" 
                onClick={() => handleDelete(p.id)} 
                style={{ backgroundColor: "#f44336" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierProducts;
