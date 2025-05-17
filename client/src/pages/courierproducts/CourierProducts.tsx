import React, { useEffect, useState } from "react";
import type { IProductType } from "../../components/product/type";
import { productService } from "../../services/api/productService";
import Product from "../../components/product/Product";
import Button from "../../components/ui/buttons/button/Button";
import { useNavigate } from "react-router-dom";
import "./courierProducts.scss"

const CourierProducts: React.FC = () => {
  const [products, setProducts] = useState<IProductType[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProductType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getCourierProducts();
      setProducts(data);
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await productService.delete(id);
      fetchProducts();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleEdit = (product: IProductType) => {
    setEditingProduct({ ...product });
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    try {
      await productService.update(editingProduct.id, {
        name: editingProduct.name,
        price: editingProduct.price,
        discount: editingProduct.discount,
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;

    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    });
  };

  return (
    <div className="courier-products">
      <div className="crt-overlay"></div>
      
      <div className="header">
        <h1>УПРАВЛЕНИЕ ТОВАРАМИ</h1>
        <Button 
          buttonText="ДОБАВИТЬ ТОВАР" 
          onClick={() => navigate("/new-product")} 
          className="retro-button primary"
        />
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Product product={product} />
            <div className="product-actions">
              <Button
                buttonText="ИЗМЕНИТЬ"
                onClick={() => handleEdit(product)}
                className="retro-button"
              />
              <Button
                buttonText="УДАЛИТЬ"
                onClick={() => handleDelete(product.id)}
                className="retro-button danger"
              />
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>РЕДАКТИРОВАНИЕ ТОВАРА</h3>

            <div className="form-group">
              <label>Название:</label>
              <input
                name="name"
                value={editingProduct.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Цена:</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Скидка (%):</label>
              <input
                type="number"
                name="discount"
                value={editingProduct.discount}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <Button
                buttonText="СОХРАНИТЬ"
                onClick={handleSave}
                className="retro-button success"
              />
              <Button
                buttonText="ОТМЕНА"
                onClick={() => setEditingProduct(null)}
                className="retro-button"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourierProducts;