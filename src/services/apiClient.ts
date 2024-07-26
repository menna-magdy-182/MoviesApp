import {API_TOKEN, BASE_URL} from '@env';
import axios from 'axios';

const API_VERSION = '3';

const apiClient = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
