import React, { useState } from "react";
import type { IFormData } from "./types";
import Input from "../../ui/buttons/inputs/Input";
import Button from "../../ui/buttons/button/Button";

const initialState: IFormData = {
  email: "",
  password: "",
  role: "",
};

const AuthForm = ({ onSubmit, formType }) => {
  const [formData, setFormData] = useState<IFormData>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
      <h2 className="auth__title">
        {formType ? "Зарегистрируйтесь" : "Войти в профиль"}
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          labelText="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
        />
        <Input
          labelText="Password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Покупатель</option>
          <option value="courier">Курьер</option>
        </select>

        <Button buttonText="Отправить" type="submit" />
      </form>
    </div>
  );
};

export default AuthForm;
