import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaVerify } from "../../api/apiService";
import { toast } from "react-toastify";

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_SITE_KEY || "";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    captcha?: string;
  }>({});
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setLoginData({
      ...loginData,
      [evt.target.name]: value,
    });
  };

  const handleLogin = async (evt: React.FormEvent) => {
    try {
      evt.preventDefault();
      const { email, password } = loginData;

      const newErrors: { email?: string; password?: string; captcha?: string } =
        {};
      if (!email.trim()) {
        newErrors.email = "Name cannot be empty.";
      }

      if (!password.trim()) {
        newErrors.password = "Name cannot be empty.";
      }
      if (!captchaValue) {
        newErrors.captcha = "Please complete the reCAPTCHA.";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const captchaResponse = await captchaVerify(captchaValue);

        if (captchaResponse?.success === true) {
          await login(email, password);
          navigate("/");
          toast("Login Successfull!");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <div>
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={onCaptchaChange} />
          {errors.captcha && <p className="error">{errors.captcha}</p>}
        </div>

        <button
          onClick={() => navigate("/forgot-password")}
          className="button-forgot"
        >
          Forgot your password?
        </button>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
