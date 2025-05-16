import React, { useEffect, useState } from "react";
import type { IProductType } from "../../components/product/type";
import { productService } from "../../services/api/productService";
import Product from "../../components/product/Product";
import Button from "../../components/ui/buttons/button/Button";
import { useNavigate } from "react-router-dom";

const CourierProducts: React.FC = () => {
  const [products, setProducts] = useState<IProductType[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProductType | null>(
    null
  );
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
    <div style={{ padding: 20 }}>
      <Button
        buttonText="Добавить товар"
        onClick={() => navigate("/new-product")}
        style={{ marginBottom: 20 }}
      />

      <div style={{ display: "grid", gap: 15 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #eee", padding: 15, borderRadius: 8 }}
          >
            <Product product={product} />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <Button
                buttonText="Изменить"
                onClick={() => handleEdit(product)}
                style={{ background: "#2196f3" }}
              />
              <Button
                buttonText="Удалить"
                onClick={() => handleDelete(product.id)}
                style={{ background: "#f44336" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Модалка */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              width: "90%",
              maxWidth: 400,
            }}
          >
            <h3>Редактирование товара</h3>

            <div style={{ margin: "15px 0" }}>
              <div style={{ marginBottom: 10 }}>
                <div>Название:</div>
                <input
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <div>Цена:</div>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <div>Скидка (%):</div>
                <input
                  type="number"
                  name="discount"
                  value={editingProduct.discount}
                  onChange={handleChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Button
                buttonText="Сохранить"
                onClick={handleSave}
                style={{ background: "#4caf50", flex: 1 }}
              />
              <Button
                buttonText="Отмена"
                onClick={() => setEditingProduct(null)}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourierProducts;
