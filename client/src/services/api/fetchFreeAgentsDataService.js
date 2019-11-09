import axios from './axios';

const fetchFreeAgentsService = (queryString) => {
    let url = '/freeagents' + queryString;
    
    return new Promise ((resolve, reject) => {
        axios(null).get(url)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default fetchFreeAgentsService;