import axios from 'axios';
import { getCookie, deleteCookie } from '../cookie';

const AxiosInstance = axios.create({
  baseURL: 'http://34.207.114.125:8080',
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
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      deleteCookie();
    }
    return Promise.reject(error);
  },
);

export { AxiosInstance };
