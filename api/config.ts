import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { API_BASE_URL, API_ERROR_MESSAGES, API_HEADERS, API_TIMEOUT } from '../constants/api';
import { tokenService } from './services/token.service';

const API_URL = Constants.expoConfig?.extra?.apiUrl || API_BASE_URL;

console.log(`API URL: ${API_URL}`);

// Flag to track if we're currently in an authentication attempt
let isAuthenticating = false;

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
});

console.log(`Axios instance created with base URL: ${api.defaults.baseURL}`);

// Request interceptor for adding auth token

const getTokenWithRetry = async (retries = 3, delay = 300): Promise<string | null> => {
  // iOS needs longer delays and more retries
  const isIOS = Platform.OS === 'ios';
  const iosRetries = isIOS ? 5 : retries;
  const iosDelay = isIOS ? 500 : delay;

  for (let i = 0; i < iosRetries; i++) {
    try {
      const token = await tokenService.getToken();
      // console.log(`🔍 ${Platform.OS} - Token retrieval attempt ${i + 1}/${iosRetries}:`, token ? 'FOUND' : 'NOT FOUND');

      if (token && token.length > 10) {
        // console.log(`✅ ${Platform.OS} - Valid token found:`, token.substring(0, 20) + '...');
        return token;
      }

      if (i < iosRetries - 1) {
        // console.warn(`⚠️ ${Platform.OS} - Token not found or invalid. Retrying in ${iosDelay}ms...`);
        await new Promise((res) => setTimeout(res, iosDelay));
      }
    } catch (error) {
      console.error(`❌ ${Platform.OS} - Error retrieving token on attempt ${i + 1}:`, error);
      if (i < iosRetries - 1) {
        await new Promise((res) => setTimeout(res, iosDelay));
      }
    }
  }
  console.warn(`❌ ${Platform.OS} - No valid token found after all retries`);
  return null;
};

// Function to manually refresh token in interceptor
export const refreshTokenInInterceptor = async () => {
  // console.log('🔄 Manually refreshing token in interceptor...');
  try {
    const token = await AsyncStorage.getItem('auth_token');
    // console.log('🔄 Current token in storage:', token ? 'EXISTS' : 'NULL');
    return token;
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    return null;
  }
};

// Function to manually set token in axios headers
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(`🔐 ${Platform.OS} - Token manually set in axios headers`);

    // iOS-specific: Force clear any cached requests
    if (Platform.OS === 'ios') {
      // console.log('🍎 iOS - Clearing axios cache...');
      // Clear any cached authorization headers
      api.defaults.headers.common = {
        ...api.defaults.headers.common,
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };
    }
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log(`🔐 ${Platform.OS} - Token removed from axios headers`);
  }
};

// Function to force refresh axios configuration for iOS
export const forceRefreshAxiosConfig = () => {
  if (Platform.OS === 'ios') {
    // console.log('🍎 iOS - Force refreshing axios configuration...');
    // Clear any cached configurations
    api.defaults.headers.common = {
      ...api.defaults.headers.common,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };
  }
};

// Function to validate token is properly set
export const validateToken = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    const headerToken = api.defaults.headers.common['Authorization'];

    // console.log(`🔍 ${Platform.OS} - Token validation:`);
    // console.log(`  Storage: ${token ? 'EXISTS' : 'MISSING'}`);
    // console.log(`  Headers: ${headerToken ? 'EXISTS' : 'MISSING'}`);

    if (token && !headerToken) {
      // console.log(`🔧 ${Platform.OS} - Token in storage but not in headers, fixing...`);
      setAuthToken(token);
      return true;
    }

    return !!(token && headerToken);
  } catch (error) {
    console.error(`❌ ${Platform.OS} - Token validation error:`, error);
    return false;
  }
};

// Function to set authentication state
export const setAuthenticating = (authenticating: boolean) => {
  isAuthenticating = authenticating;
  console.log(`🔐 Authentication state set to: ${authenticating}`);
};

// Function to temporarily disable 401 redirects
export const disable401Redirect = () => {
  console.log('🚫 401 redirects temporarily disabled');
  return () => {
    console.log('✅ 401 redirects re-enabled');
  };
};

api.interceptors.request.use(
  // @ts-ignore
  async (config) => {
    // console.log(`📱 Platform: ${Platform.OS}`);
    // console.log(`🔧 DEV Mode: ${__DEV__}`);
    // console.log(`🌐 Request URL: ${config.baseURL}${config.url}`);

    // Set authenticating flag for auth endpoints
    if (config.url?.includes('login') && config.method === 'post') {
      setAuthenticating(true);
    }

    if (config.url?.includes("youtube.com") || config.url?.includes("googlevideo.com") || config.url?.includes("youtube.be")) {
      return config;
    }

    try {
      const token = await getTokenWithRetry(3, 300);
      // console.log("token on request interceptor", token);
      // console.log(`🔑 Token retrieved on ${Platform.OS}:`, token ? 'EXISTS' : 'NULL');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log('🔐 Token attached to request:', token);
        // console.log('Final headers:', config.headers);
        if (Platform.OS === 'ios') {
          // console.log('🍎 iOS - Final headers:', JSON.stringify(config.headers, null, 2));
        }
      } else {
        // console.warn('⚠️ No token found in AsyncStorage');
      }
    } catch (err) {
      // console.error('❌ Error fetching token from AsyncStorage', err);
      // console.error(`❌ ${Platform.OS} - AsyncStorage error:`, err);
    }
    return config;
  },
  (error) => {
    // console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401
api.interceptors.response.use(
  (response) => {
    // Reset authentication flag on successful response
    if (response.config.url?.includes('login')) {
      setAuthenticating(false);
    }
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;

    // Reset authentication flag on error
    if (url?.includes('login')) {
      setAuthenticating(false);
    }

    // Don't redirect if we're currently authenticating OR if this is a home/dashboard endpoint
    const isHomeEndpoint = url?.includes('home');
    const shouldRedirect = status === 401 && isHomeEndpoint;

    if (shouldRedirect) {
      // console.warn('🚫 Unauthorized. Clearing storage and redirecting to login.');
      // console.log('URL that caused 401:', url);
      await AsyncStorage.clear();
      router.replace('/(auth)/login');
      error.message = API_ERROR_MESSAGES.UNAUTHORIZED;
    } else if (status === 401 && (isAuthenticating || isHomeEndpoint)) {
      // console.log('🚫 401 during authentication or home endpoint - not redirecting to prevent loop');
      console.log('Auth endpoint that failed:', url);
    }

    // Handle common errors
    if (error.code === 'ECONNABORTED') {
      error.message = API_ERROR_MESSAGES.TIMEOUT_ERROR;
    } else if (!error.response) {
      error.message = API_ERROR_MESSAGES.NETWORK_ERROR;
    } else if (status === 500) {
      error.message = API_ERROR_MESSAGES.SERVER_ERROR;
    }

    console.error('❌ API Error:', error.message);
    return Promise.reject(error);
  }
);

export default api; 