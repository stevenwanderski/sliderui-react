import axios from 'axios';

const ajax = axios.create({
  baseURL: `${process.env.API_URL}/api`
});

ajax.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Token token=${token}`;
  }

  return config;
});

// const token = localStorage.getItem('token');
//
// if (token) {
//   ajax.defaults.headers = { 'Authorization': `Token token=${token}` }
// }

export default ajax;
