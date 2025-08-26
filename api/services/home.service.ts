import { API_ENDPOINTS } from '../../constants/api';
import api from '../config';
import { ApiResponse, HomeScreenResponse } from '../types';


export const homeService = {
  homeScreen: async (): Promise<ApiResponse<HomeScreenResponse>> => {
    try {
      const config = {
        method: 'get',
        url: API_ENDPOINTS.HOME.HOME_SCREEN,
        headers: {}, // optional, axios will fill this in
      };
      const response = await api.get<ApiResponse<HomeScreenResponse>>(config.url);
      // console.log('✅ Full URL:', response.config.baseURL + response.config.url);

      return response.data;
    } catch (error: any) {
      // console.error("❌ API Error:", error.response?.data || error.message);
      // console.error('Error fetching home screen data here:', error);
      throw error;
    }
  },

  homeDegreeScreen: async (): Promise<ApiResponse<HomeScreenResponse>> => {
    try {
      const config = {
        method: 'get',
        url: API_ENDPOINTS.HOME.HOME_DEGREE_SCREEN,
        headers: {}, // optional, axios will fill this in
      };
      const response = await api.get<ApiResponse<HomeScreenResponse>>(config.url);

      return response.data;
    } catch (error: any) {

      console.error('Error fetching home degree screen data here:', error);
      throw error;
    }
  },
};
