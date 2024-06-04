// useAuthCall.jsx (1-1)

import React from "react";
import {
  fetchFail,
  fetchStart,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
} from "../features/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useAuth } from "../helper/AuthContext"; // AuthContext'i import et

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const { login: authContextLogin, logout: authContextLogout } = useAuth(); // Context'ten login ve logout fonksiyonlarını al

  const register = async (userInfo) => {
    console.log(userInfo);
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/`, userInfo);
      console.log("register", data);
      toastSuccessNotify("Register performed");
      dispatch(registerSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login/`, userInfo);
      dispatch(loginSuccess(data));
      authContextLogin();  // Kullanıcı oturum durumunu güncelle
      toastSuccessNotify("Login performed");
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify("Login can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.get(`${BASE_URL}auth/logout/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutSuccess());
      authContextLogout();  // Kullanıcı oturum durumunu güncelle
      toastSuccessNotify("Logout performed");
      navigate("/login");
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify("Logout can not be performed");
    }
  };

  return { register, login, logout };
};

export default useAuthCall;
