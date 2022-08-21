import axios from 'axios';

const defConfig = {
  baseURL: process.env.VUE_APP_SERVER_URL || `http://localhost:8080/`,
  headers: {
    Authorization: process.env.API_KEY || 'Testing'
  }
};
console.log(defConfig);

export const http = axios.create(defConfig)