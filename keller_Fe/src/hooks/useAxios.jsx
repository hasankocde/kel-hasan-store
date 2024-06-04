// import axios from "axios";

// import { useSelector } from "react-redux";

// const useAxios = () => {
//   const { token } = useSelector((state) => state.auth);
//   console.log("Bearer:", token); // Inspect the token

//   const axiosWithToken = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   console.log("Request headers:", axiosWithToken.defaults.headers); // Inspect the headers
//   return { axiosWithToken };
// };

// export default useAxios;



import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);
  console.log("Bearer:", token); // Inspect the token
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return { axiosWithToken: axiosInstance };
};

export default useAxios;




