import axios from './axios';

const fetchDataService = (accessToken, model, repeat, id, queryString = '') => {
    let url, tryNumber = repeat ? repeat : 1;

    switch (model) {
        case 'agents':
            url = id ? '/agent/' + id : '/agents' + queryString;
            break;
        case 'cities':
            url = id ? '/city/' + id : '/cities' + queryString;
            break;
        case 'clocks':
            url = id ? '/clock/' + id : '/clocks' + queryString;
            break;
        case 'marks':
            url = id ? '/mark/' + id : '/marks' + queryString;
            break;
        case 'coverage':
            url = id ? '/coverage/' + id : '/coverage' + queryString;
            break;
        case 'orders':
            url = id ? '/order/' + id : '/orders' + queryString;
            break;
        case 'permissions':
            url = id ? '/permission/' + id : '/permissions' + queryString;
            break;
        case 'roles':
            url = id ? '/role/' + id : '/roles' + queryString;
            break;
        case 'users':
            url = id ? '/user/' + id : '/users' + queryString;
            break;
        default:
            url = '/';
    }

    return new Promise (async (resolve, reject) => {
        let success = null, failure = null, tryCounter = 0;
        while (tryCounter < tryNumber) {
            await axios(accessToken).get(url)
                .then((response) => {
                    success = response;
                    tryCounter = tryNumber;
                })
                .catch((error) => {
                    failure = error;
                    tryCounter += 1;
                });
        }
        if (success) {
            return resolve(success);
        }
        return reject(failure);
    });
};

export default fetchDataService;