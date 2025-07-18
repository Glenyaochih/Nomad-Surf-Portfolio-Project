import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getPaymentAPI = {
  postPayment: async (id) => {
    console.log(id);
    return axios.post(`${BASE_URL}/v2/api/${API_PATH}/pay/${id}`);
  },
};
