import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getOrderAPI = {
  postOrder: async (data) => {
    return axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data);
  },
  getOrders: async () => {
    return axios.get(`${BASE_URL}/v2/api/${API_PATH}/orders`);
  },
  getOrder: async (id) => {
    return axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${id}`);
  },
};
