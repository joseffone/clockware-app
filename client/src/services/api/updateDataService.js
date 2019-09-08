import axios from './axios';

const updateDataService = (accessToken, model, id, dataObj) => {
    let url;

    switch (model) {
        case 'agents':
            url = '/agent/' + id;
            break;
        case 'cities':
            url = '/city/' + id;
            break;
        case 'clocks':
            url = '/clock/' + id;
            break;
        case 'marks':
            url = '/mark/' + id;
            break;
        case 'coverage':
            url = '/coverage/' + id;
            break;
        case 'orders':
            url = '/order/' + id;
            break;
        case 'permissions':
            url = '/permission/' + id;
            break;
        case 'roles':
            url = '/role/' + id;
            break;
        case 'users':
            url = '/user/' + id;
            break;
        default:
            url = '/';
    }

    return new Promise ((resolve, reject) => {
        axios(accessToken).patch(url, dataObj)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default updateDataService;