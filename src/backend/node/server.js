import axios from 'axios';
import Cookies from 'js-cookie';
import ls from 'local-storage';

let authorization = Cookies.get('authorization') || ls.get('authorization');

const server = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    authorization: 'Bearer ' + authorization,
  },
});

export default server;
