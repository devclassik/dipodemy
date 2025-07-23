import axios from "axios";
import { API_ENDPOINTS } from "../../constants/api";
import api from "../config";
import { ApiResponse, CategoryScreenResponse } from "../types";

export const learnService = {
  learnScreen: async (
    data?: string | number
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {
      let url = API_ENDPOINTS.SEARCH.CATEGORY_LIST;
      if (typeof data === "number") {
        url += `/${data}`;
      } else if (typeof data === "string" && data.trim() !== "") {
        url += `?search=${data}`;
      }
      // console.log("Fetching search screen data from:", url);
      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);
      // console.log('Raw server response:', response);
      return response.data;
    } catch (error) {
      console.error("Error fetching search screen data:", error);
      throw error; // or handle as needed
    }
  },

  learnScreenPaginated: async (params: {
    id?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {

      let url = API_ENDPOINTS.LEARN.LEARN_SCREEN;
      const query: string[] = [];
      if (params.id) url += `/${params.id}`;
      if (params.search) query.push(`search=${params.search}`);
      if (params.page) query.push(`page=${params.page}`);
      if (params.limit) query.push(`limit=${params.limit}`);
      if (query.length) url += `?${query.join("&")}`;
      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  courseDetailScreen: async (
    data?: string | number
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {
      let url = API_ENDPOINTS.LEARN.LEARN_SCREEN;

      if (data) {
        url += `/${data}`;
      }

      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching course details screen data:", error);
      throw error;
    }
  },

  currriculumScreen: async (
    data: string | number
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {

      const url = `${API_ENDPOINTS.LEARN.LEARN_SCREEN}/${data}/${API_ENDPOINTS.LEARN.LESSONS}`;
      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching course details screen data:", error);
      throw error;
    }
  },

  enrollCourse: async (
    data?: string | number
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {
      let url = API_ENDPOINTS.LEARN.ENROLLED_COURSES;

      const paymentData = {
        "course_id": data,
      }

      const response = await api.post<ApiResponse<CategoryScreenResponse>>(url, paymentData);
      return response.data;
    } catch (error) {
      console.error("Error fetching course details screen data:", error);
      throw error;
    }
  },
};

export const paystackService = {
  initiatePayment: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const PAYSTACK_SECRET_KEY = "sk_test_1f508aae89a73e82eb038c0cf8e3952564ca7fff";
      const PAYSTACK_PUBLIC_KEY = "pk_test_2190ecf3bf99d361967255d38c775490418038bf";

      const response = await axios.post<ApiResponse<any>>(`https://api.paystack.co/transaction/initialize`, data,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error initiating payment:", error);
      throw error;
    }
  },

  verifyPayment: async (reference: string): Promise<ApiResponse<any>> => {
    const PAYSTACK_SECRET_KEY = "sk_test_1f508aae89a73e82eb038c0cf8e3952564ca7fff";
    const PAYSTACK_PUBLIC_KEY = "pk_test_2190ecf3bf99d361967255d38c775490418038bf";
    try {
      const response = await axios.get<ApiResponse<any>>(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  },
};
