import { API_ENDPOINTS } from '../../constants/api';
import api from '../config';
import { ApiResponse, AuthResponse, ResetPasswordResponse, User } from '../types';

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
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      // console.error('Login error:', error);
      throw error;
    }
  },

  resendOtp: async (userData: Partial<User>): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.RESEND_OTP, userData);
      return response.data;
    } catch (error) {
      // console.error('Login error:', error);
      throw error;
    }
  },

  verifyOtp: async (userData: Partial<User>): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.VERIFY_OTP, userData);
      return response.data;
    } catch (error) {
      // console.error('Login error:', error);
      throw error;
    }
  },

  forgotPassword: async (userData: Partial<User>): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, userData);
      return response.data;
    } catch (error) {
      // console.error('Login error:', error);
      throw error;
    }
  },

  resetForgotPassword: async (userData: Partial<User>): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.RESET_FORGOTTEN_PASSWORD, userData);
      return response.data;
    } catch (error) {
      // console.error('Login error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },


  resetPassword: async (password: string, password_confirmation: string, current_password?: string): Promise<ApiResponse<ResetPasswordResponse>> => {
    try {
      const response = await api.post<ApiResponse<ResetPasswordResponse>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        password,
        password_confirmation,
        current_password,
      });
      return response.data;
    } catch (error) {
      // console.error('Reset password error:', error);
      throw error;
    }

  },


  // Logout
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
}; 