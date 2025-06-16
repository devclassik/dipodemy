import axios from 'axios';
import Constants from 'expo-constants';
import { API_BASE_URL, API_ERROR_MESSAGES, API_HEADERS, API_TIMEOUT } from '../constants/api';

// Get the API URL from environment variables or use the constant
const API_URL = Constants.expoConfig?.extra?.apiUrl || API_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // You can get the token from your storage here
    const token = ''; // Add your token retrieval logic here
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Add your token refresh logic here
      // const newToken = await refreshToken();
      // originalRequest.headers.Authorization = `Bearer ${newToken}`;
      // return api(originalRequest);
    }

    // Handle common errors
    if (error.code === 'ECONNABORTED') {
      error.message = API_ERROR_MESSAGES.TIMEOUT_ERROR;
    } else if (!error.response) {
      error.message = API_ERROR_MESSAGES.NETWORK_ERROR;
    } else if (error.response.status === 500) {
      error.message = API_ERROR_MESSAGES.SERVER_ERROR;
    } else if (error.response.status === 401) {
      error.message = API_ERROR_MESSAGES.UNAUTHORIZED;
    }

    return Promise.reject(error);
  }
);

export default api; 