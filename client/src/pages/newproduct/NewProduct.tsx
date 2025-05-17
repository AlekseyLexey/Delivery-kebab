import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/api/productService";
import type { IProductFormData } from "../../services/models/productModels";
import "./newproduct.scss"

function NewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IProductFormData>({
    name: "",
    price: "",
    discount: "",
    imgURL: null,
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
      if (formData.imgURL instanceof File) {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("discount", formData.discount);
        formDataToSend.append("imgURL", formData.imgURL);

        await productService.create(formDataToSend);
      } else {
        await productService.create(formData);
      }

      navigate("/courier-products");
    } catch (err) {
      setError("Не удалось создать товар. Пожалуйста, попробуйте снова.");
      console.error("Error creating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-product">
      <div className="crt-overlay"></div>
      
      <div className="form-container">
        <h2>Добавить новый товар</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название товара:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Цена (руб):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Скидка (%):</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="99"
            />
          </div>

          <div className="form-group">
            <label>Изображение товара:</label>
            <input
              type="file"
              name="imgURL"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
          >
            {isSubmitting ? "Создание..." : "Создать товар"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;