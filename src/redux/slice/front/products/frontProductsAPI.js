import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const frontGetProductsAPI = {
  getProducts: () => {
    const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`);
    return Promise.all([req]).then(([res]) => res);
  },
  getSingleProducts: (id) => {
    const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
    return Promise.all([req]).then(([res]) => res);
  },
};
