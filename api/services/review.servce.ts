import { API_ENDPOINTS } from '../../constants/api';
import api from '../config';
import { ApiResponse, ReviewResponse } from '../types';

export const reviewService = {
    reviewScreen: async (reviewId: string): Promise<ApiResponse<ReviewResponse>> => {
        try {
            console.log('Fetching review screen data from:', API_ENDPOINTS.REVIEW.REVIEW_SCREEN);
            let url = API_ENDPOINTS.REVIEW.REVIEW_SCREEN;
            if (reviewId) {
                url = `${reviewId}/${url}`;
            }
            const response = await api.get<ApiResponse<ReviewResponse>>(url);
            // console.log('Raw server response:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching home screen data:', error);
            throw error;
        }
    },
};