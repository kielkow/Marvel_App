import axios from 'axios';

const api = axios.create({
  baseURL: 'https://developer.marvel.com',
});

export default api;
