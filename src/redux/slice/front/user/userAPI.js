import axios from 'axios';

export const getUserAPI = {
  userSignup: (data) => {
    const req = axios.post('https://nomad-server-4254.onrender.com/signup', data);
    return Promise.all([req]).then(([res]) => res);
  },
  userSignin: (data) => {
    const req = axios.post('https://nomad-server-4254.onrender.com/signin', data);
    return Promise.all([req]).then(([res]) => res);
  },
};
