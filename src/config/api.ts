// API configuration for diabetes prediction backend
export const API_CONFIG = {
  // Update this when your new model backend is ready
  BACKEND_URL: process.env.VITE_BACKEND_URL || "https://type2diabetes-ai.onrender.com",
  
  // Endpoints
  ENDPOINTS: {
    PREDICT: "/predict",
    HEALTH: "/health"
  },
  
  // Timeout settings
  TIMEOUT: 30000, // 30 seconds
  
  // Error messages
  ERROR_MESSAGES: {
    NETWORK: "Unable to connect to our servers. Please check your internet connection and try again.",
    TIMEOUT: "The request is taking longer than expected. Please try again.",
    SERVER: "🔧 Our AI model is currently being updated for better accuracy. Please try again in a few minutes. We're working to provide you with the most accurate diabetes risk assessment possible!",
    VALIDATION: "Please check your input data and try again."
  }
};
