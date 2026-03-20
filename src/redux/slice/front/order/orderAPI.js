import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getOrderAPI = {
  postOrder: (data) => {
    const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data);
    return Promise.all([req]).then(([res]) => res);
  },
  getOrders: () => {
    const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/orders`);
    return Promise.all([req]).then(([res]) => res);
  },
  getOrder: (id) => {
    const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${id}`);
    return Promise.all([req]).then(([res]) => res);
  },
};
