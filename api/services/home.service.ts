import AsyncStorage from '@react-native-async-storage/async-storage';
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
  
        console.log('📡 Requesting home screen data from:', config.url);
        
        // Log the exact token being used
        const token = await AsyncStorage.getItem('auth_token');
        console.log('🔍 Token from storage:', token ? 'EXISTS' : 'MISSING');
        console.log('🔍 Token in headers:', api.defaults.headers.common['Authorization'] ? 'EXISTS' : 'MISSING');
        
        const response = await api.get<ApiResponse<HomeScreenResponse>>(config.url);
        
        console.log('✅ Response successful');
        console.log('✅ Full URL:', response.config.baseURL + response.config.url);
  
        return response.data;
      } catch (error: any) {
        console.error("❌ API Error:", error.response?.data || error.message);

        if (error.config) {
          console.error('❌ Failed request URL:', error.config.baseURL + error.config.url);
          console.error('❌ Failed request headers:', error.config.headers);
        }
        
        // If the main endpoint fails, try alternative endpoints
        if (error.response?.status === 404 || error.response?.status === 401) {
          console.log('🔄 Trying alternative home endpoint...');
          try {
            const alternativeResponse = await api.get<ApiResponse<HomeScreenResponse>>('dashboard');
            console.log('✅ Alternative endpoint succeeded');
            return alternativeResponse.data;
          } catch (altError: any) {
            console.error('❌ Alternative endpoint also failed:', altError.response?.data || altError.message);
          }
        }
  
        console.error('Error fetching home screen data here:', error);
        throw error;
      }
    },
  };
  