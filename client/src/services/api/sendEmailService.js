import axios from './axios';

const sendEmailService = (accessToken, emailDataObj) => {
    return new Promise ((resolve, reject) => {
        axios(accessToken).post('/email', emailDataObj)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default sendEmailService;