import React, { useContext } from "react";
import UserInfo from "../../components/userInfo/UserInfo";
import ActionCustomerWallet from "../../components/ActionCustomerWallet";
import { UserContext } from "../../app/UserContex";
import Spiner from "../../components/Spinner";
import './profile.scss'

const Profile: React.FC = () => {
  const contex = useContext(UserContext);

  if (!contex || !contex.user) return <Spiner />;

  return (
    <div className="profile">
      <UserInfo user={contex.user} />
      {contex.user.role === "customer" && (
        <ActionCustomerWallet setUser={contex.setUser} />
      )}
    </div>
  );
};

export default Profile;
