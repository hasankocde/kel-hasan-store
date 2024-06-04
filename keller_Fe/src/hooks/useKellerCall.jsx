import React from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {fetchFail, fetchStart, getSuccess} from "../features/kellerSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useKellerCall  = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);

  const { axiosWithToken } = useAxios();

  const dispatch = useDispatch();

  
 

  const deleteKellerData = async (url, id) => {
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}${url}/${id}`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify("Operation succes");
      getKellerData(url);
    } catch (error) {
      dispatch(fetchFail());
      // toastErrorNotify(error?.response?.data?.message || "Operation not success")
    }
  };


  



  const putKellerData = async (url, body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${body._id}`, body);
      getKellerData(url); // `url` parametresine tam URL'yi geçirin
      toastSuccessNotify("Operation successful");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };
  

  

  const putUserData = async (url, body, isFormData = false) => {
    dispatch(fetchStart());
    try {
        const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
        const response = await axiosWithToken.put(url, body, config); // URL should be correctly set
        dispatch(getSuccess({ data: response.data, url }));
        toastSuccessNotify("Operation successful");
        return response.data;
    } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify(error?.response?.data?.message || "Operation not successful");
        return null;
    }
};


 
  const getCategories = async () => {
    dispatch(fetchStart());
    try {
        const { data } = await axios.get(`${BASE_URL}categories`);
        dispatch(getSuccess({ data: data.data, url: 'categories' }));
        // console.log('Data successfully fetched:', data);
    } catch (error) {
        dispatch(fetchFail());
        // console.log('Error fetching data:', error);
    }
};

 // Assuming getKellerData is properly fetching data
const getKellerData = async (url) => {
  dispatch(fetchStart());
  try {
    const { data } = await axiosWithToken.get(`${url}`);
    dispatch(getSuccess({ data: data.data, url }));
    return data.data; // Returning the actual data array
     console.log('Data successfully fetched:', data.data);
  } catch (error) {
    dispatch(fetchFail());
    toastErrorNotify(error?.response?.data?.message || "Operation not successful");
  }
};



  const getAddressData = async () => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('addresses/my-address');
      const data = response.data;
      dispatch(getSuccess({ data, url: 'addresses' }));
      // console.log('Data successfully fetched:', data);
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };


  const getMessageData = async () => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('messages/my-message');
      const data = response.data;
      dispatch(getSuccess({ data, url: 'messages' }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
      return null;
    }
  };

  const getUserData = async () => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('users/my-user');
      const data = response.data;
      dispatch(getSuccess({ data, url: 'users' }));
      console.log('Data successfully fetched:', data);
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };


  const postKellerData = async (url, body) => {
    dispatch(fetchStart());
    console.log("Post request started");
    try {
      const response = await axiosWithToken.post(`${url}`, body);
      const data = response.data;
      toastSuccessNotify("Operation successful");
      return data; // Oluşturulan adres verisini geri döndür
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Operation failed");
      console.log(error);
    }
  };
  


  

  const postAdKellerData = async (url, body, config = {}) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...config.headers,
        },
        ...config,
      });
      toastSuccessNotify("Operation successful");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Operation not successful");
    }
  };


  
 

  return {
    
    getCategories,
    getKellerData,
    deleteKellerData,
    postKellerData,
    postAdKellerData,
    putKellerData,
    getAddressData,
    getUserData,
    putUserData,
    getMessageData
    
   
   
  };
};

export default useKellerCall ;
