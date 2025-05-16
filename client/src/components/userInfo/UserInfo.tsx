import React from "react";
import type { IUser } from "../../types/userTypes";

interface UserInfoProps {
  user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { username, email, phone, wallet, city } = user;

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
    </div>
  );
};

export default UserInfo;
