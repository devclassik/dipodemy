import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { API_BASE_URL, API_ERROR_MESSAGES, API_HEADERS, API_TIMEOUT } from '../constants/api';

const API_URL = Constants.expoConfig?.extra?.apiUrl || API_BASE_URL;

console.log(`API URL: ${API_URL}`);

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
});

console.log(`Axios instance created with base URL: ${api.defaults.baseURL}`);

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.clear();
      router.replace('/(auth)/login');
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