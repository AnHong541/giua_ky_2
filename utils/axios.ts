import axios from 'axios';
 
const axiosInstance = axios.create({
  baseURL: 'https://69d9947626585bd92dd317d3.mockapi.io/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
export default axiosInstance;
