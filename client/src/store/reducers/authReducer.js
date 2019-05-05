import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';


const initState = {
    accessToken: null,
    accessTokenIat: null,
    accessTokenExp: null,
    error: null,
    isLoading: false,
    pathToAutoRedirect: '/'
};

const authReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.LOGIN_REQUEST:
            return rewriteObjectProps(state, {
                error: null,
                isLoading: true
            });

        case actionTypes.LOGIN_SUCCESS:
            return rewriteObjectProps(state, {
                accessToken: action.authData.access_token,
                accessTokenIat: action.authData.access_token_iat,
                accessTokenExp: action.authData.access_token_exp,
                isLoading: false,
                pathToAutoRedirect: '/admin'
            });

        case actionTypes.LOGIN_FAILURE:
            return rewriteObjectProps(state, {
                error: action.error,
                isLoading: false,
                pathToAutoRedirect: '/'
            });

        case actionTypes.REFRESH_TOKENS_REQUEST:
            return rewriteObjectProps(state, {
                error: null
            });

        case actionTypes.REFRESH_TOKENS_SUCCESS:
            return rewriteObjectProps(state, {
                accessToken: action.authData.access_token,
                accessTokenIat: action.authData.access_token_iat,
                accessTokenExp: action.authData.access_token_exp,
                pathToAutoRedirect: '/admin'
            });

        case actionTypes.REFRESH_TOKENS_FAILURE:
            return rewriteObjectProps(state, {
                error: action.error,
                accessToken: null,
                accessTokenIat: null,
                accessTokenExp: null,
                pathToAutoRedirect: '/'
            });
        
        case actionTypes.LOGOUT_REQUEST:
            return rewriteObjectProps(state, {
                error: null,
                isLoading: true
            });

        case actionTypes.LOGOUT_SUCCESS:
            return rewriteObjectProps(state, {
                accessToken: null,
                accessTokenIat: null,
                accessTokenExp: null,
                isLoading: false,
                pathToAutoRedirect: '/'
            });

        case actionTypes.LOGOUT_FAILURE:
            return rewriteObjectProps(state, {
                error: action.error,
                isLoading: false
            });

        default:
            return state;

    }
};

export default authReducer;