import axios from 'axios';

const server = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  timeout: 10000,
  withCredentials: true,
});

export default server;
