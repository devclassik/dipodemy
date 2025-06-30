// import { AxiosRequestConfig } from "axios";

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

export interface ApiRequestConfig {
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
  // token: string;
  // user: User;
}

export interface HomeScreenResponse {}

interface Category {
  id: number;
  name: string;
  image: string;
  status: string; // Or a literal type like "active" | "inactive" if those are the only possible values
}

interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

interface CategoryData {
  categories: Category[];
  meta: Meta;
}

export interface CategoryScreenResponse {
  success?: boolean;
  message?: string;
  data: {
    categories: Category[];
    meta: Meta;
  };
}


export interface ProfileScreenResponse {
}
// Add more interfaces as needed for your API endpoints
