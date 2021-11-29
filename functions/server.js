import axios from 'axios';

const server = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  timeout: 1000,
  withCredentials: true,
});

export default server;
