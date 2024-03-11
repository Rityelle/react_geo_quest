import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;