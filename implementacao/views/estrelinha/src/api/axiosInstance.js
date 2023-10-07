import axios from 'axios';

const header = { Pragma: 'no-cache' };

export const useApi = axios.create({
    headers: header,
    baseURL: "http://localhost:3000/"
})