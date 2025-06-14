import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 8000,
  headers: {
    Accept: 'application/vnd.github.v3+json',    
  },
});

export default apiClient;
