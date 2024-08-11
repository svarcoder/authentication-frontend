import React, { useState } from "react";
import { forgotPasswordApi } from "../../api/apiService";
import { toast } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
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
      const { email } = loginData;
      const response = await forgotPasswordApi(email);
      if (response) {
        toast("Mail Sent Successfull!");
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
            <h1>Forgot Password</h1>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <button>Send Mail</button>
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

export default ForgotPassword;
