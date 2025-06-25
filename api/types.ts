import { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  pagination?: T;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Add your API-specific types here
export interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface HomeScreenResponse {
  
}

// Add more interfaces as needed for your API endpoints 