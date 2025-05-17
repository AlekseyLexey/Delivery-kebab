import React, { useContext, useState } from "react";
import UserInfo from "../../components/userInfo/UserInfo";
import { UserContext } from "../../app/UserContex";
import Spiner from "../../components/Spinner";
import './profile.scss'

const Profile: React.FC = () => {
  const context = useContext(UserContext);
  const [amount, setAmount] = useState("");

  if (!context || !context.user) return <Spiner />;

  const handleTopUp = () => {
    if (!amount || isNaN(Number(amount))) return;
    
    context.setUser((prev: any) => ({
      ...prev,
      wallet: prev.wallet + Number(amount)
    }));
    setAmount("");
  };

  return (
    <div className="profile">
      <div className="crt-overlay"></div>
      
      <div className="user-info-container">
        <UserInfo user={context.user} />
      </div>

      {context.user.role === "customer" && (
        <div className="wallet-section">
          <h2>ПОПОЛНЕНИЕ БАЛАНСА</h2>
          
          <div className="wallet-form">
            <div className="form-group">
              <label>СУММА:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                placeholder="100"
                className="retro-input"
              />
            </div>

            <button
              onClick={handleTopUp}
              disabled={!amount || isNaN(Number(amount))}
              className="retro-button success"
            >
              ПОПОЛНИТЬ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;