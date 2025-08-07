import { API_ENDPOINTS } from "../../constants/api";
import api from "../config";
import { ApiResponse, NotificationScreenResponse, ProfileScreenResponse } from "../types";

export const profileService = {
  profileScreen: async (): Promise<ApiResponse<ProfileScreenResponse>> => {
    try {

      const response = await api.get<ApiResponse<ProfileScreenResponse>>(
        API_ENDPOINTS.PROFILE.GET_PROFILE
      );
      // console.log('Raw server response:', response);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile screen data:", error);
      throw error; // or handle as needed
    }
  },

  updateProfileScreen: async (data: {
    first_name?: string;
    last_name?: string;
    image?: string;
  }): Promise<ApiResponse<ProfileScreenResponse>> => {
    try {

      const response = await api.post<ApiResponse<ProfileScreenResponse>>(
        API_ENDPOINTS.PROFILE.GET_PROFILE, data
      );
      // console.log('Raw server response:', response);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile screen data:", error);
      throw error; // or handle as needed
    }
  },

  notificationScreen: async (): Promise<ApiResponse<NotificationScreenResponse>> => {
    try {

      const response = await api.get<ApiResponse<NotificationScreenResponse>>(
        API_ENDPOINTS.HOME.NOTIFICATION
      );
      // console.log('Raw server response:', response);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile screen data:", error);
      throw error; // or handle as needed
    }
  },
};
