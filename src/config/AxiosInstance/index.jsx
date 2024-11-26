import axios from 'axios';
import { getCookie } from '../cookie';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_DEV,
});

AxiosInstance.interceptors.request.use(
  async (request) => {
    const cookie = await getCookie();

    if (cookie) {
      request.headers['Authorization'] = `Bearer ${cookie}`;
    }

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export { AxiosInstance };
