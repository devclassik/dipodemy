import { API_ENDPOINTS } from '../../constants/api';
import api from '../config';
import { ApiResponse, AuthResponse, User } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      // console.error('Login error:', error);
      throw error; 

    }
  },

  // Register
  register: async (userData: Partial<User>): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  // Logout
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
}; 