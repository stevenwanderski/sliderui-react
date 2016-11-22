import axios from 'axios';
import { currentUser } from 'utils/auth';

const ajax = axios.create({
  baseURL: `${process.env.API_URL}/api`
});

ajax.interceptors.request.use((config) => {
  const user = currentUser();

  if (user) {
    config.headers['Authorization'] = `Token token=${user.token}`;
  }

  return config;
});

export default ajax;
