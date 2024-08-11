import React, { useState } from "react";
import { updatePasswordApi } from "../../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [loginData, setLoginData] = useState({
    password: "",
  });

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setLoginData({
      ...loginData,
      [evt.target.name]: value,
    });
  };

  const handleLogin = async (evt: any) => {
    try {
      evt.preventDefault();

      const { password } = loginData;

      const response = await updatePasswordApi(user?.username, password);
      if (response) {
        navigate("/login");
        toast("Password Update Successfull!");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-main">
      <div className={"container"} id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Update Password</h1>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            <button>Update</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
