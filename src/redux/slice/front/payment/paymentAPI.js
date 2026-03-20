import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getPaymentAPI = {
  postPayment: (id) => {
    const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/pay/${id}`);
    return Promise.all([req]).then(([res]) => res);
  },
};
