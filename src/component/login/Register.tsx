import React, { useState } from "react";
import { signupApi } from "../../api/apiService";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    // Basic email pattern validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 7 characters long
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;
    return passwordPattern.test(password);
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
      const { name, email, password } = loginData;

      const newErrors: { name?: string; email?: string; password?: string } =
        {};
      if (!name.trim()) {
        newErrors.name = "Name cannot be empty.";
      }

      if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email address.";
      }

      if (!validatePassword(password)) {
        newErrors.password =
          "Password must be at least 7 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const response = await signupApi(email, name, password);

        if (response?.status === 201) {
          setLoginData({
            name: "",
            email: "",
            password: "",
          });
          toast("Please login!");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleLogin}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={loginData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        {errors.password && <p className="error">{errors.password}</p>}
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
