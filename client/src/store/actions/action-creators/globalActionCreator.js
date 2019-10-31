import * as actionTypes from '../action-types';

const globalActionCreator = {};

globalActionCreator.changeDisplayView = (mobile) => {
    return {
        type: actionTypes.GLOBAL_CHANGE_DISPLAY_VIEW,
        mobile
    };
};

globalActionCreator.toggleSidebar = () => {
    return {
        type: actionTypes.GLOBAL_TOGGLE_SIDEBAR
    };
};

globalActionCreator.toggleSidebarButtonPress = () => {
    return {
        type: actionTypes.GLOBAL_TOGGLE_SIDEBAR_BUTTON_PRESS
    };
};

export default globalActionCreator;