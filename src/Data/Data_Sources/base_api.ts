

import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: "http://192.168.1.111:53896/api",
    headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": `en`

    }
})

instance.interceptors.response.use(function (response) {
  
    return response.data;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

export default instance;
