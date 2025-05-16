import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    location: "",
    originalPrice: "",
    discount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/courier-products");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        position: "fixed",
        top: "60px",
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #f9f9f9, #e0e0e0)",
        overflow: "auto",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Добавить непринятый заказ
        </h1>
        <form className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-full text-center">
              Название Товара
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center"
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-full text-center">
              Изображение товара
            </label>
            <div className="w-full flex justify-center">
              <input
                type="file"
                accept="image/*"
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-full text-center">
              Цена
            </label>
            <input
              type="number"
              name="originalPrice"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center"
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-full text-center">
              Скидка (%)
            </label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Добавить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
