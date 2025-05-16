import React, { useEffect, useState } from "react";
import type { IProductType } from "../../components/product/type";
import { productSrvice } from "../../services/api/productService";
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
    const products = await productSrvice.getCourierProducts();
    setProducts(products);
  };

  const handleDelete = async (id: number): Promise<void> => {
    await productSrvice.delete(id);
    await fetchingProducts();
  };

  return (
    <div className="courier-products">
      <ul className="courier-products__list">
        {products.map((p) => (
          <li className="courier-products__item" key={p.id}>
            <Product product={p} />
            <Button buttonText="Удалить" onClick={() => handleDelete(p.id)} />
            <Button
              buttonText="Изменить"
              onClick={() => navigate("/new-product")}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierProducts;
