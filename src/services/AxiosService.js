import axios from "axios";
import { Navigate } from "react-router";


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
      return <Navigate to="/users/logout" replace={true} />
    } 
    return Promise.reject(error);
  },
);

export default AxiosObj;