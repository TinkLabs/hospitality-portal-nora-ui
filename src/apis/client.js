import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  timeout: 1000,
  headers: {
    "Accept-Language": "ja_JP",
    "X-Requested-Client": "Handy"
  }
});

export default instance;