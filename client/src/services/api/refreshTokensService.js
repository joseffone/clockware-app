import axios from './axios';

const refreshTokensService = (refreshToken) => {
    return new Promise ((resolve, reject) => {
        axios(refreshToken).get('/refresh')
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default refreshTokensService;