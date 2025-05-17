import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import Button from "../ui/buttons/button/Button";
import { UserContext } from "../../app/UserContex";

const BUTTON_TEXTS = {
  PRODUCTS: "ПРОДУКТЫ",
  LOGOUT: "ВЫХОД",
  BASKET: "КОРЗИНА",
  ORDERS: "МОИ ЗАКАЗЫ",
  PROFILE: "ПРОФИЛЬ",
  NEWPRODUCT: "НОВЫЙ ТОВАР",
  AVIALABLERODUCTS: "МОИ ТОВАРЫ",
  ACTIVEORDERS: "ЗАКАЗЫ",
};

const Header: React.FC = () => {
  const contex = useContext(UserContext);
  const navigate = useNavigate();

  if (!contex) {
    return null;
  }

  const { user } = contex;

  return (
    <header className="header">
      <div className="crt-overlay"></div>
      {user && (
        <div className="header__content">
          {user.role === "customer" && (
            <>
              <Button
                onClick={() => navigate("/products")}
                buttonText={BUTTON_TEXTS.PRODUCTS}
                className="retro-button"
              />
              <Button
                onClick={() => navigate("/buscket")}
                buttonText={BUTTON_TEXTS.BASKET}
                className="retro-button"
              />
              <Button
                onClick={() => navigate("/orders")}
                buttonText={BUTTON_TEXTS.ORDERS}
                className="retro-button"
              />
            </>
          )}
          {user.role === "courier" && (
            <>
              <Button
                buttonText={BUTTON_TEXTS.NEWPRODUCT}
                onClick={() => navigate("/new-product")}
                className="retro-button primary"
              />
              <Button
                buttonText={BUTTON_TEXTS.AVIALABLERODUCTS}
                onClick={() => navigate("/courier-products")}
                className="retro-button"
              />
              <Button
                buttonText={BUTTON_TEXTS.ACTIVEORDERS}
                onClick={() => navigate("/courier-orders")}
                className="retro-button"
              />
            </>
          )}

          <Button
            onClick={() => navigate("/profile")}
            buttonText={BUTTON_TEXTS.PROFILE}
            className="retro-button success"
          />
          <Button
            onClick={contex.handleLogOut}
            buttonText={BUTTON_TEXTS.LOGOUT}
            className="retro-button danger"
          />
        </div>
      )}
    </header>
  );
};

export default Header;