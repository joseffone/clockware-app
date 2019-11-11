import fetchDataService from './fetchDataService';
import createDataService from './createDataService';
import updateDataService from './updateDataService';
import deleteDataService from './deleteDataService';
import loginUserService from './loginUserService';
import logoutUserService from './logoutUserService';
import refreshTokensService from './refreshTokensService';
import fetchFreeAgentsDataService from './fetchFreeAgentsDataService';

const apiServiceController = (options) => {
    let repeatNumber = 1;
    let timeDelay = 0;

    if (options) {
        repeatNumber = options.repeat || repeatNumber;
        timeDelay = options.delay || timeDelay;
    }

    const setDelay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

    const customize = (serviceFunc, repeatNumber, timeDelay) => {
        return new Promise (async (resolve, reject) => {
            let success = null, failure = null, repeatCounter = 0;
            while (repeatCounter < repeatNumber) {
                await serviceFunc()
                    .then((response) => {
                        success = response;
                        repeatCounter = repeatNumber;
                    })
                    .catch((error) => {
                        failure = error;
                        repeatCounter += 1;
                    });
                    if (failure) {
                        await setDelay(timeDelay*1000);
                    }
            }
            if (success) {
                return resolve(success);
            }
            return reject(failure);
        });
    };

    return {
        fetchData: (accessToken, model, id, queryString) => customize(
            () => fetchDataService(accessToken, model, id, queryString), repeatNumber, timeDelay
        ),
        createData: (accessToken, model, dataObj) => customize(
            () => createDataService(accessToken, model, dataObj), repeatNumber, timeDelay
        ),
        updateData: (accessToken, model, id, dataObj) => customize(
            () => updateDataService(accessToken, model, id, dataObj), repeatNumber, timeDelay
        ),
        deleteData: (accessToken, model, id, queryString) => customize(
            () => deleteDataService(accessToken, model, id, queryString), repeatNumber, timeDelay
        ),
        loginUser: (loginData) => customize(
            () => loginUserService(loginData), repeatNumber, timeDelay
        ),
        refreshTokens: (refreshToken) => customize(
            () => refreshTokensService(refreshToken), repeatNumber, timeDelay
        ),
        logoutUser: (accessToken) => customize(
            () => logoutUserService(accessToken), repeatNumber, timeDelay
        ),
        fetchFreeAgentsData: (queryString) => customize(
            () => fetchFreeAgentsDataService(queryString), repeatNumber, timeDelay
        )
    };
};

export default apiServiceController;