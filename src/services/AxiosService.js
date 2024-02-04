import axios from "axios";
import { Navigate, useNavigate } from "react-router";


const AxiosObj =  axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosObj.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `${token}` : '';
  return config;
});

AxiosObj.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    } 
    return Promise.reject(error);
  },
);

export default AxiosObj;