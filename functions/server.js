import axios from 'axios';
var ls = require('local-storage');
const jwt = ls('jwt');
const server = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    authorization: 'Bearer ' + jwt,
  },
});

export default server;
