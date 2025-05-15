import React, { useState } from "react";
import type { IAuthFormData } from "../../../types/userTypes";
import Input from "../../ui/buttons/inputs/Input";
import Button from "../../ui/buttons/button/Button";
import "../form.css";

const initialState: IAuthFormData = {
  email: "",
  password: "",
};

interface AuthFormProps {
  onSubmit(formData: IAuthFormData): void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IAuthFormData>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-form">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          labelText="Почта"
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
        />
        <Input
          labelText="Пароль"
          value={formData.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
        />

        <Button buttonText="Отправить" type="submit" />
      </form>
    </div>
  );
};

export default AuthForm;
