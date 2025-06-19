import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const frontGetCartAPI = {
  postCart: async (data) => {
    console.log(data);
    return axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, data);
  },
  getCart: async () => {
    return axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
  },
  putCart: async (cartId, data) => {
    console.log(cartId);
    return axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`, data);
  },
  deleteSingleCart: async (cartId) => {
    console.log(cartId);
    return axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`);
  },
  clearCart: async () => {
    return axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
  },
};
