import axios from 'axios';

const axiosInstance = (token) => {
    let headers = {'Content-Type': 'application/json'};
    if (token) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        };
    }
    return axios.create({
        headers
    });
};

export default axiosInstance;