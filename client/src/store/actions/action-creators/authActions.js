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
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('refresh_token_iat', response.data.refresh_token_iat);
                localStorage.setItem('refresh_token_exp', response.data.refresh_token_exp);
                localStorage.setItem('pathToAutoRedirect', '/admin');
                dispatch(loginSuccess(response.data));
                dispatch(setAccessTimeout(response.data.refresh_token, response.data.access_token_exp - response.data.access_token_iat));
                dispatch(setRefreshTimeout(response.data.access_token, response.data.refresh_token_exp - response.data.refresh_token_iat));
            })
            .catch(error => {
                dispatch(loginFailure(error));
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
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('refresh_token_iat', response.data.refresh_token_iat);
                localStorage.setItem('refresh_token_exp', response.data.refresh_token_exp);
                localStorage.setItem('pathToAutoRedirect', '/admin');
                dispatch(refreshTokensSuccess(response.data));
                dispatch(setAccessTimeout(response.data.refresh_token, response.data.access_token_exp - response.data.access_token_iat));
                dispatch(setRefreshTimeout(response.data.access_token, response.data.refresh_token_exp - response.data.refresh_token_iat));
            })
            .catch(error => {
                clearTimeout(localStorage.getItem('accessTimeoutID'));
                clearTimeout(localStorage.getItem('refreshTimeoutID'));
                localStorage.clear();
                dispatch(refreshTokensFailure(error));
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
                clearTimeout(localStorage.getItem('accessTimeoutID'));
                clearTimeout(localStorage.getItem('refreshTimeoutID'));
                localStorage.clear();
                dispatch(logoutSuccess());
            })
            .catch(error => {
                dispatch(logoutFailure(error));
            });
    };
};

export const setAccessTimeout = (refreshToken, delayInSec) => {
    return dispatch => {
        localStorage.setItem(
            'accessTimeoutID',
            setTimeout(
                () => {
                    dispatch(refreshTokensRequest(refreshToken));
                }, 
                delayInSec*1000
            )
        );
    };
};

export const setRefreshTimeout = (accessToken, delayInSec) => {
    return dispatch => {
        localStorage.setItem(
            'refreshTimeoutID',
            setTimeout(
                () => {
                    dispatch(logoutRequest(accessToken));
                }, 
                delayInSec*1000
            )
        );
    };
};
