import axios from 'axios';
import axiosInstance from './api';

// Sign Up
export const signupApi = async (username: string, name: string, password: string) => {
  const response = await axiosInstance.post(`/api/auth/signup`,{ username, name, password });
  return response;
};

// Login
export const loginApi = async (username: string, password: string) => {
  const response = await axiosInstance.post(`/api/auth/login`, { username, password });
  return response;
};

// Forgot Password
export const forgotPasswordApi = async (username: string) => {
  const response = await axiosInstance.post(`/api/auth/forgot-password`, { username });
  return response;
};

// Update Password
export const updatePasswordApi = async (username: string|undefined, newPassword: string) => {
  const response = await axiosInstance.post(`/api/auth/update-password`, { username, newPassword });
  return response;
};

// Create Lead
export const createLeadApi = async (leadData: { email: string; name: string; number: string; product: string }) => {
  const response = await axiosInstance.post(`/api/leads/create`, leadData);
  return response;
};

// Get Leads
export const getLeadsApi = async (token: string) => {
  const response = await axiosInstance.get(`/api/leads/get`);
  return response;
};

// Get Lead by ID
export const getLeadByIdApi = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/api/leads/${id}`);
  return response;
};

// Update Lead
export const updateLeadApi = async (id: string, leadData: { email: string; name: string; number: string; product: string }, token: string) => {
  const response = await axiosInstance.put(`/api/leads/update/${id}`, leadData);
  return response;
};

// Delete Lead
export const deleteLeadApi = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/api/leads/delete/${id}`);
  return response;
};

// Captcha Verify
export const captchaVerify = async (captchaValue: string|null) => {
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: process.env.REACT_APP_SECRET,
      response: captchaValue,
    },
  });
  return response.data;
};
