import { API_ENDPOINTS } from "../../constants/api";
import api from "../config";
import { ApiResponse, CategoryScreenResponse } from "../types";

export const searchService = {
  categoryScreen: async (
    data?: string | number
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {
      let url = API_ENDPOINTS.SEARCH.CATEGORY_LIST;
      if (typeof data === "number") {
        url += `/${data}`;
      } else if (typeof data === "string" && data.trim() !== "") {
        url += `?search=${data}`;
      }
      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);
      // console.log('Raw server response:', response);
      return response.data;
    } catch (error) {
      console.error("Error fetching search screen data:", error);
      throw error; // or handle as needed
    }
  },

  categoryScreenPaginated: async (
    params: { search?: string; page?: number; limit?: number }
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {
      
      let url = API_ENDPOINTS.SEARCH.CATEGORY_LIST;
      const query: string[] = [];
      if (params.search) query.push(`search=${params.search}`);
      if (params.page) query.push(`page=${params.page}`);
      if (params.limit) query.push(`per_page=${params.limit}`);
      if (query.length) url += `?${query.join("&")}`;
      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  categoryScreenIdPaginated: async (
    id: any,
  ): Promise<ApiResponse<CategoryScreenResponse>> => {
    try {
      let url = API_ENDPOINTS.SEARCH.CATEGORY_LIST;
      if (id) {
        url += `/${id}`;
      }
      const response = await api.get<ApiResponse<CategoryScreenResponse>>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
