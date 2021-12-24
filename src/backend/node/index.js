import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Authorization'] = 'ok';
