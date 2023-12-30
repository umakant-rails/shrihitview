import axios from "axios";

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

export default AxiosObj;