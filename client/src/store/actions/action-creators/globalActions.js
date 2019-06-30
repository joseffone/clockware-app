import * as actionTypes from '../action-types';

export const changeDisplayView = (mobile) => {
    return {
        type: actionTypes.CHANGE_DISPLAY_VIEW,
        mobile
    };
};

export const toggleSidebar = () => {
    return {
        type: actionTypes.TOGGLE_SIDEBAR
    };
};