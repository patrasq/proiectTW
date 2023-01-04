import axios from 'axios';

// api config
const apiConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// create axios instance
const api = axios.create(apiConfig);

// request interceptor
api.interceptors.request.use(
    config => {
        // do something before request is sent
        return config;
    }
);

// response interceptor
api.interceptors.response.use(
    response => {
        // do something with response data
        return response;
    }
);

// export axios instance
export default api;