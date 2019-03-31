import * as actionTypes from '../actions/action-types/actionTypes';

const initState = {
    accessToken: null,
    permissions: null,
    isLoading: false
};

const authReducer = (state = initState, action) => {
    return state;
};

export default authReducer;