import axios from './axios';

const confirmReservationService = (confirmToken) => {
    return new Promise ((resolve, reject) => {
        axios(confirmToken).patch('/orders/confirm')
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default confirmReservationService;