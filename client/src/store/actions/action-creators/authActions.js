import * as actionTypes from '../action-types';
import { loginUserService, logoutUserService, refreshTokensService } from '../../../services/api';

export const loginSuccess = (authDataObj) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        authData: authDataObj
    };
};

export const loginFailure = (error) => {
    return {
        type: actionTypes.LOGIN_FAILURE,
        error: error
    };
};

export const loginRequest = (loginDataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGIN_REQUEST
        });
        loginUserService(loginDataObj)
            .then(response => {
                //...
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('refresh_token_iat', response.data.refresh_token_iat);
                localStorage.setItem('refresh_token_exp', response.data.refresh_token_exp);
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            });
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
};

export const logoutFailure = () => {
    return {
        type: actionTypes.LOGOUT_FAILURE
    };
};

export const logoutRequest = (accessToken) => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGOUT_REQUEST
        });
        logoutUserService(accessToken)
            .then(response => {
                //...
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('refresh_token_iat');
                localStorage.removeItem('refresh_token_exp');
                dispatch(logoutSuccess());
            })
            .catch(error => {
                dispatch(logoutFailure(error));
            });
    };
};

export const refreshTokensSuccess = (authDataObj) => {
    return {
        type: actionTypes.REFRESH_TOKENS_SUCCESS,
        authData: authDataObj
    };
};

export const refreshTokensFailure = (error) => {
    return {
        type: actionTypes.REFRESH_TOKENS_FAILURE,
        error: error
    };
};

export const refreshTokensRequest = (refreshToken) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REFRESH_TOKENS_REQUEST
        });
        refreshTokensService(refreshToken)
            .then(response => {
                //...
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('refresh_token_iat', response.data.refresh_token_iat);
                localStorage.setItem('refresh_token_exp', response.data.refresh_token_exp);
                dispatch(refreshTokensSuccess(response.data));
            })
            .catch(error => {
                dispatch(refreshTokensFailure(error));
            });
    };
};

export const setAccessTimeout = (refreshToken, delayInSec) => {
    return dispatch => {
        setTimeout(
            () => {
                dispatch(refreshTokensRequest(refreshToken));
            }, 
            delayInSec*1000
        );
    };
};

export const setRefreshTimeout = (accessToken, delayInSec) => {
    return dispatch => {
        setTimeout(
            () => {
                dispatch(logoutRequest(accessToken));
            }, 
            delayInSec*1000
        );
    };
};
