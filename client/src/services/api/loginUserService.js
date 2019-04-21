import axios from './axios';

const loginDataService = (loginDataObj) => {
    return new Promise ((resolve, reject) => {
        axios().post('/login', loginDataObj)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default loginDataService;