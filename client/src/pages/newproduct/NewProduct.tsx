import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/api/productService";
import type { IProductFormData } from "../../services/models/productModels";

function NewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IProductFormData>({
    name: "",
    price: "",
    discount: "",
    imgURL: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imgURL: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await productService.create(formData);
      navigate("/courier-products");
    } catch (err) {
      setError("Не удалось создать товар. Пожалуйста, попробуйте снова.");
      console.error("Error creating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Добавить новый товар
      </h2>

      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Название товара:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Цена (руб):
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="1"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Скидка (%):
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            min="0"
            max="99"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Изображение товара:
          </label>
          <input
            type="file"
            name="imgURL"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isSubmitting ? "#cccccc" : "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Создание..." : "Создать товар"}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
