// API Base URL
export const API_BASE_URL = "https://adcparty.com.ng/api/v1/";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "login",
    REGISTER: "register",
    RESEND_OTP: "resend-token",
    VERIFY_OTP: "verify-email",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH_TOKEN: "/auth/refresh-token",
    RESET_PASSWORD: "change-password",
    FORGOT_PASSWORD: "forgot-password",
    RESET_FORGOTTEN_PASSWORD: "reset-password",
  },

  // User endpoints
  USER: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
  },
  HOME: {
    HOME_SCREEN: "",
    HOME_SCREEN_COURSES: "/home/courses",
    HOME_SCREEN_COURSE_DETAILS: "/home/course-details",
  },
  SEARCH: {
    CATEGORY_LIST: "categories",
  },
  PROFILE: {
    GET_PROFILE: "profile",
  },
  LEARN: {
    LEARN_SCREEN: "courses",
    ENROLLED_COURSES: "enrollments",
    LESSONS: "lessons",
    LEARN_SCREEN_COURSE_DETAILS: "categories/course-details",
    LEARN_SCREEN_COURSE_LIST: "categories/courses",
    SECTIONS: "sections",
  },
  COURSE: {
    ENROLLED_COURSES: "enrollments",
  },
  REVIEW: {
    REVIEW_SCREEN: "reviews",
    COURSE_REVIEWS: "courses/reviews",
  },
  PAYSTACK: {
    INITIATE: "paystack/initiate",
    VERIFY: "paystack/verify",
  },

  // Add more endpoint categories as needed
};

// API Headers
export const API_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// API Timeouts
export const API_TIMEOUT = 10000; // 10 seconds

// API Error Messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "Unauthorized. Please login again.",
};

export const TIMEOUT_MS = 120000; // 2 minutes
