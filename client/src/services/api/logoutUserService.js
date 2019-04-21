import axios from './axios';

const logoutUserService = (accessToken) => {
    return new Promise ((resolve, reject) => {
        axios(accessToken).delete('/logout')
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default logoutUserService;