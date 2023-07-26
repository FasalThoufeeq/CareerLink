import axios from 'axios';

export const messageApi = axios.create({
  baseURL: 'http://localhost:3000/api/message',
});