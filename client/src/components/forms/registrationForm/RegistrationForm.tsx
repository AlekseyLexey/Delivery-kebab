import React, { useState } from "react";
import { CITIES, type IRegistrationFormData } from "../../../types/userTypes";
import Input from "../../ui/buttons/inputs/Input";
import Button from "../../ui/buttons/button/Button";
import "../form.css";

const initialState: IRegistrationFormData = {
  username: "",
  phone: "",
  email: "",
  password: "",
  city: "",
  role: "",
};

interface RegistrationFormProps {
  onSubmit(formData: IRegistrationFormData): void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IRegistrationFormData>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city) {
      alert("Выберите город!");
      return;
    }
    if (!formData.role) {
      alert("Выберите роль!");
      return;
    }
    onSubmit(formData);
    setFormData(initialState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="auth-form">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          labelText="Имя"
          value={formData.username}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="User Name"
        />
        <Input
          labelText="Почта"
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          labelText="Телефон"
          value={formData.phone}
          onChange={handleChange}
          type="text"
          name="phone"
          placeholder="Phone"
        />
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">-- Выберите город --</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <Input
          labelText="Пароль"
          value={formData.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">-- Выберите роль --</option>
          <option value="customer">Покупатель</option>
          <option value="courier">Курьер</option>
        </select>

        <Button buttonText="Отправить" type="submit" />
      </form>
    </div>
  );
};

export default RegistrationForm;
