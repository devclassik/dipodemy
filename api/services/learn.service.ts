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
      console.log("Fetching search screen data from:", url);
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
      console.log("Fetching paginated learn screen data with params:");

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

