import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getCouponsAPI = {
  postCoupon: (data) => {
    const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`, data);
    return Promise.all([req]).then(([res]) => res);
  },
};
