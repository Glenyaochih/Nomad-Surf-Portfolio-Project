import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const frontGetCartAPI = {
  postCart: (data) => {
    const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, data);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
  getCart: () => {
    const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
  putCart: (cartId, data) => {
    const req = axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`, data);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
  deleteSingleCart: (cartId) => {
    const req = axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
  clearCart: () => {
    const req = axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
};
