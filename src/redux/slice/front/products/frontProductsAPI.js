import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const frontGetProductsAPI = {
  getProducts: async () => {
    return axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`);
  },
  getSingleProducts: async (id) => {
    return axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
  },
};
