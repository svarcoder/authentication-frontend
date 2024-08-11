import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.name}</p>
    </div>
  );
};

export default Profile;
