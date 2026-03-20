import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getCouponsAPI = {
  postCoupon: async (data) => {
    return axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`, data);
  },
};
