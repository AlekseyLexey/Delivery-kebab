import React, { useContext, useState } from "react";
import { UserContext } from "../../app/UserContex";
import Spiner from "../Spinner";
import Button from "../ui/buttons/button/Button";
import Input from "../ui/buttons/inputs/Input";
import { userService } from "../../services/api/userService";

const UserInfo: React.FC = () => {
  const [balanceInput, setBalanceInput] = useState<string>("");
  const contex = useContext(UserContext);

  if (!contex || !contex.user) return <Spiner />;

  const turnUpWallet = async () => {
    const updatedUser = await userService.update({
      wallet: parseInt(balanceInput),
    });
    setBalanceInput("");
    alert(`Баланс пополнен на сумму ${balanceInput}`);
    contex.setUser(updatedUser);
  };

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
      <div className="profile-info__actions">
        <Input
          labelText="Add Balance"
          value={balanceInput}
          onChange={(e) => setBalanceInput(e.target.value)}
          type="number"
          name="balance"
          placeholder="Write value"
        />
        <Button buttonText="Пополнить баланс" onClick={turnUpWallet} />
      </div>
    </div>
  );
};

export default UserInfo;
