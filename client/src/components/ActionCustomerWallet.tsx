import React, { useState } from "react";
import Input from "./ui/buttons/inputs/Input";
import Button from "./ui/buttons/button/Button";
import { userService } from "../services/api/userService";
import type { IUser } from "../types/userTypes";

interface ActionCustomerWalletProps {
  setUser(user: IUser): void;
}

const ActionCustomerWallet: React.FC<ActionCustomerWalletProps> = ({
  setUser,
}) => {
  const [balanceInput, setBalanceInput] = useState<string>("");

  const turnUpWallet = async () => {
    const updatedUser = await userService.update({
      wallet: parseInt(balanceInput),
    });
    setBalanceInput("");
    alert(`Баланс пополнен на сумму ${balanceInput}`);
    setUser(updatedUser);
  };
  return (
    <div className="action-wallet">
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
  );
};

export default ActionCustomerWallet;
