import React, { useContext } from "react";
// import Wrapper from "../Container";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import Button from "../ui/buttons/button/Button";
import { UserContext } from "../../app/UserContex";

const BUTTON_TEXTS = {
  PRODUCTS: "Продукты",
  LOGOUT: "Выйти",
  BASKET: "Корзина",
  ORDERS: "Мои заказы",
  PROFILE: "Профиль",
  NEWPRODUCT: "Разместить продукт",
  AVIALABLERODUCTS: "Размещенные продукты",
  ACTIVEORDERS: "Активные заказы",
};

const Header: React.FC = () => {
  const contex = useContext(UserContext);
  const navigate = useNavigate();

  if (!contex) {
    return;
  }

  const { user } = contex;

  return (
    <header className="header">
      {user && (
        <>
          <div className="header__content">
            {user.role === "customer" && (
              <>
                <Button
                  onClick={() => navigate("/products")}
                  buttonText={BUTTON_TEXTS.PRODUCTS}
                />
                <Button
                  onClick={() => navigate("/buscket")}
                  buttonText={BUTTON_TEXTS.BASKET}
                />
                <Button
                  onClick={() => navigate("/orders")}
                  buttonText={BUTTON_TEXTS.ORDERS}
                />
              </>
            )}
            {user.role === "courier" && (
              <>
                <Button
                  buttonText={BUTTON_TEXTS.NEWPRODUCT}
                  onClick={() => navigate("/new-product")}
                />
                <Button
                  buttonText={BUTTON_TEXTS.AVIALABLERODUCTS}
                  onClick={() => navigate("/courier-products")}
                />
                <Button
                  buttonText={BUTTON_TEXTS.ACTIVEORDERS}
                  onClick={() => navigate("/courier-orders")}
                />
              </>
            )}

            <Button
              onClick={() => navigate("/profile")}
              buttonText={BUTTON_TEXTS.PROFILE}
            />
            <Button
              onClick={contex.handleLogOut}
              buttonText={BUTTON_TEXTS.LOGOUT}
            />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
