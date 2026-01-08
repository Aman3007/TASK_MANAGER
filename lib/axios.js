import axios from 'axios';

const api = axios.create({
  baseURL:  'https://task-manager-backend-oyzs.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
