import axios from 'axios';

export const getUserAPI = {
  userSignup: async (data) => {
    return axios.post('https://nomad-server-4254.onrender.com/signup', data);
  },
  userSignin: async (data) => {
    return axios.post('https://nomad-server-4254.onrender.com/signin', data);
  },
};
