import axios from "axios";
import { showError } from "../slices/messageSlice";


const AxiosObj =  axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // paramsSerializer: (params) => JSON.stringify(params),
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
      setTimeout( () => {
        window.location = "/users/login";
      }, 1000);
    } 
    return Promise.reject(error);
  },
);

export default AxiosObj;