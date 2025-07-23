import { API_ENDPOINTS } from '../../constants/api';
import api from '../config';
import { ApiResponse, HomeScreenResponse } from '../types';


export const homeService = {
    // Home Screen API
    homeScreen: async (): Promise<ApiResponse<HomeScreenResponse>> => {
        try {
            const response = await api.get<ApiResponse<HomeScreenResponse>>(API_ENDPOINTS.HOME.HOME_SCREEN);
            // console.log('Raw server response:', response);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching home screen data:', error);
            throw error; // or handle as needed
        }
    },
};