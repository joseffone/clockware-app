import axios from './axios';

const createDataService = (accessToken, model, dataObj) => {
    let url;

    switch (model) {
        case 'agents':
            url = '/agent';
            break;
        case 'cities':
            url = '/city';
            break;
        case 'clocks':
            url = '/clock';
            break;
        case 'marks':
            url = '/mark';
            break;
        case 'coverage':
            url = '/coverage';
            break;
        case 'orders':
            url = '/order';
            break;
        case 'permissions':
            url = '/permission';
            break;
        case 'roles':
            url = '/role';
            break;
        case 'users':
            url = '/signup';
            break;
        default:
            url = '/';
    }

    return new Promise ((resolve, reject) => {
        axios(accessToken).post(url, dataObj)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default createDataService;