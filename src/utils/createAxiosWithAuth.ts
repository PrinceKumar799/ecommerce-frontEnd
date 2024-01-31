import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';


// Create an Axios instance with an interceptor for the authorization header
const createAxiosWithAuth = (): AxiosInstance => {
  const axiosWithAuth = axios.create();

  // Interceptor to add authorization header
  axiosWithAuth.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // Clone the config to avoid modifying the original
      const modifiedConfig = { ...config };

      // Ensure headers is defined before updating it
      modifiedConfig.headers = modifiedConfig.headers || {};

      // Cast headers to AxiosHeaders type
      const headers = modifiedConfig.headers as Record<string, string>;

      // Get the auth token from local storage
      const authToken = localStorage.getItem('authToken');

      // Add Authorization header if authToken is present
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      return modifiedConfig;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Optional: Add interceptors for responses, errors, etc.

  return axiosWithAuth;
};

export default createAxiosWithAuth;
