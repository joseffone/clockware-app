import * as actionTypes from '../actions/action-types';

const initState = {
    accessToken: null,
    permissions: null,
    error: null,
    isLoading: false
};

const authReducer = (state = initState, action) => {
    return state;
};

export default authReducer;