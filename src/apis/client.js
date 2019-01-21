import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {
    "Accept-Language": "ja_JP",
    "X-Requested-Client": "Handy"
  }
});

export default instance;