import React, { useContext, useState } from "react";
import AuthForm from "../../components/forms/authForm/AuthForm";
import RegistrationForm from "../../components/forms/registrationForm/RegistrationForm";
import Button from "../../components/ui/buttons/button/Button";
import { authReq } from "../../services/api/authService";
import type {
  IAuthFormData,
  IRegistrationFormData,
} from "../../types/userTypes";
import "./auth.scss";
import { UserContext } from "../../app/UserContex";

const Auth: React.FC = () => {
  const [isRegistration, setRegistration] = useState<boolean>(true);
  const contex = useContext(UserContext);

  if (!contex) {
    return;
  }

  const { handleLogIn } = contex;

  const handleSubmit = async (
    formData: IAuthFormData | IRegistrationFormData
  ) => {
    const url = isRegistration ? "/registration" : "/login";
    const { user } = await authReq(url, formData);
    handleLogIn(user);
  };

  return (
    <div className="auth">
      {isRegistration ? (
        <Button onClick={() => setRegistration(false)} buttonText="Войти" />
      ) : (
        <Button
          onClick={() => setRegistration(true)}
          buttonText="Регистрация"
        />
      )}
      {isRegistration ? (
        <>
          <h2>Зарегистрируйтесь</h2>
          <RegistrationForm onSubmit={handleSubmit} />
        </>
      ) : (
        <>
          <h2>Войти в профиль</h2>
          <AuthForm onSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default Auth;
