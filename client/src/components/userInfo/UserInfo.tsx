import React, { useContext } from "react";
import { UserContext } from "../../app/UserContex";
import Spiner from "../Spinner";
import ActionCustomerWallet from "../ActionCustomerWallet";

const UserInfo: React.FC = () => {
  const contex = useContext(UserContext);

  if (!contex || !contex.user) return <Spiner />;

  const { username, email, phone, wallet, city } = contex.user;

  return (
    <div className="profile-info">
      <h3 className="profile-info__username">
        <strong>Имя:</strong> <span>{username}</span>
      </h3>

      <div className="profile-info__email">
        <strong>Email:</strong> <span>{email}</span>
      </div>

      <div className="profile-info__city">
        <strong>Город:</strong> <span>{city}</span>
      </div>

      <div className="profile-info__phone">
        <strong>Телефон:</strong> <span>{phone}</span>
      </div>

      <div className="profile-info__balance">
        <strong>Баланс:</strong> {Number(wallet).toLocaleString("ru-RU")} Руб
      </div>

      <ActionCustomerWallet setUser={contex.setUser} />
    </div>
  );
};

export default UserInfo;
