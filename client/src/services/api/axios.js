import axios from 'axios';

const axiosInstance = (token) => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    });
};

export default axiosInstance;