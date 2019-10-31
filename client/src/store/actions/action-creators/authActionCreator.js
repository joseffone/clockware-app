import * as actionTypes from '../action-types';
import { loginUserService, logoutUserService, refreshTokensService } from '../../../services/api';

const authActionCreator = {};

authActionCreator.loginSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        authData
    };
};

authActionCreator.loginFailure = (error) => {
    return {
        type: actionTypes.AUTH_LOGIN_FAILURE,
        error
    };
};

authActionCreator.loginRequest = (loginData) => {
    return dispatch => {
        dispatch({
            type: actionTypes.AUTH_LOGIN_REQUEST
        });
        loginUserService(loginData)
            .then(response => {
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('refresh_token_iat', response.data.refresh_token_iat);
                localStorage.setItem('refresh_token_exp', response.data.refresh_token_exp);
                dispatch(authActionCreator.loginSuccess(response.data));
                dispatch(authActionCreator.setAccessTimeout(response.data.refresh_token, response.data.access_token_exp - response.data.access_token_iat));
            })
            .catch(error => {
                dispatch(authActionCreator.loginFailure(error));
            });
    };
};

authActionCreator.refreshTokensSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_REFRESH_TOKENS_SUCCESS,
        authData
    };
};

authActionCreator.refreshTokensFailure = (error) => {
    return {
        type: actionTypes.AUTH_REFRESH_TOKENS_FAILURE,
        error
    };
};

authActionCreator.refreshTokensRequest = (refreshToken) => {
    return dispatch => {
        dispatch({
            type: actionTypes.AUTH_REFRESH_TOKENS_REQUEST
        });
        refreshTokensService(refreshToken)
            .then(response => {
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('refresh_token_iat', response.data.refresh_token_iat);
                localStorage.setItem('refresh_token_exp', response.data.refresh_token_exp);
                dispatch(authActionCreator.refreshTokensSuccess(response.data));
                dispatch(authActionCreator.setAccessTimeout(response.data.refresh_token, response.data.access_token_exp - response.data.access_token_iat));
            })
            .catch(error => {
                clearTimeout(localStorage.getItem('accessTimeoutID'));
                localStorage.clear();
                dispatch(authActionCreator.refreshTokensFailure(error));
            });
    };
};

authActionCreator.logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS
    };
};

authActionCreator.logoutFailure = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_FAILURE
    };
};

authActionCreator.logoutRequest = (accessToken) => {
    return dispatch => {
        dispatch({
            type: actionTypes.AUTH_LOGOUT_REQUEST
        });
        logoutUserService(accessToken)
            .then(response => {
                clearTimeout(localStorage.getItem('accessTimeoutID'));
                localStorage.clear();
                dispatch(authActionCreator.logoutSuccess());
            })
            .catch(error => {
                dispatch(authActionCreator.logoutFailure(error));
            });
    };
};

authActionCreator.setAccessTimeout = (refreshToken, delayInSec) => {
    return dispatch => {
        localStorage.setItem(
            'accessTimeoutID',
            setTimeout(
                () => {
                    dispatch(authActionCreator.refreshTokensRequest(refreshToken));
                }, 
                delayInSec*1000
            )
        );
    };
};

export default authActionCreator;