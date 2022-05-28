import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const axiosTopicClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TOPIC_BASE_URL,
});

export default axiosClient;
