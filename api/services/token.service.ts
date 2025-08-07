import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const USER_CREDS_KEY = 'user_creds';

export const tokenService = {
  // Store token using secure storage (preferred) with fallback to AsyncStorage
  setToken: async (token: string): Promise<boolean> => {
    try {
      // Try secure storage first
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      console.log('🔐 Token stored in SecureStore');
      
      // Also store in AsyncStorage as backup
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('🔐 Token stored in AsyncStorage as backup');
      
      return true;
    } catch (error) {
      console.error('❌ SecureStore failed, using AsyncStorage only:', error);
      try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        console.log('🔐 Token stored in AsyncStorage only');
        return true;
      } catch (asyncError) {
        console.error('❌ AsyncStorage also failed:', asyncError);
        return false;
      }
    }
  },

  // Get token from secure storage first, then AsyncStorage as fallback
  getToken: async (): Promise<string | null> => {
    try {
      // Try secure storage first
      let token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        console.log('🔐 Token retrieved from SecureStore');
        return token;
      }
      
      // Fallback to AsyncStorage
      token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        console.log('🔐 Token retrieved from AsyncStorage');
        return token;
      }
      
      console.log('🔐 No token found in either storage');
      return null;
    } catch (error) {
      console.error('❌ Error retrieving token:', error);
      return null;
    }
  },

  // Remove token from both storages
  removeToken: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('🔐 Token removed from both storages');
    } catch (error) {
      console.error('❌ Error removing token:', error);
    }
  },

  // Store user credentials
  setUserCreds: async (email: string, password: string): Promise<boolean> => {
    try {
      const creds = JSON.stringify({ email, password });
      await AsyncStorage.setItem(USER_CREDS_KEY, creds);
      console.log('🔐 User credentials stored');
      return true;
    } catch (error) {
      console.error('❌ Error storing user credentials:', error);
      return false;
    }
  },

  // Get user credentials
  getUserCreds: async (): Promise<{ email: string; password: string } | null> => {
    try {
      const creds = await AsyncStorage.getItem(USER_CREDS_KEY);
      if (creds) {
        return JSON.parse(creds);
      }
      return null;
    } catch (error) {
      console.error('❌ Error retrieving user credentials:', error);
      return null;
    }
  },

  // Remove user credentials
  removeUserCreds: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_CREDS_KEY);
      console.log('🔐 User credentials removed');
    } catch (error) {
      console.error('❌ Error removing user credentials:', error);
    }
  },

  // Clear all authentication data
  clearAll: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_CREDS_KEY]);
      console.log('🔐 All authentication data cleared');
    } catch (error) {
      console.error('❌ Error clearing authentication data:', error);
    }
  },

  // Check if token exists
  hasToken: async (): Promise<boolean> => {
    const token = await tokenService.getToken();
    return !!token;
  },

  // Validate token format
  isValidToken: (token: string): boolean => {
    return !!(token && token.length > 10 && token.includes('|'));
  }
};
