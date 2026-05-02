// config.ts
// Export the base API URL using Vite's environment variables.
// If the variable is not set, fallback to localhost.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api';
