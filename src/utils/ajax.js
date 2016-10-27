import axios from 'axios';

const ajax = axios.create({
  baseURL: `${process.env.API_URL}/api`
});

export default ajax;
