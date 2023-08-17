import axios from 'axios';

export const messageApi = axios.create({
  baseURL: 'https://careerlink.cloud/api/message',
});