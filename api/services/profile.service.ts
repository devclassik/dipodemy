import { API_ENDPOINTS } from "../../constants/api";
import api from "../config";
import { ApiResponse, ProfileScreenResponse } from "../types";

export const profileService = {
  profileScreen: async (): Promise<ApiResponse<ProfileScreenResponse>> => {
    try {
      console.log(
        "Fetching profile screen data from:",
        API_ENDPOINTS.HOME.HOME_SCREEN
      );
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
};
