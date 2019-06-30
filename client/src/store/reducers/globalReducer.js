import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';

const initState = {
    ui: {
        mobile: false,
        isSidebarOpen: false
    }
};

const globalReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.CHANGE_DISPLAY_VIEW:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    mobile: action.mobile
                })
            });

        case actionTypes.TOGGLE_SIDEBAR:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    isSidebarOpen: !state.ui.isSidebarOpen
                })
            });

        default:
            return state;

    }
};

export default globalReducer;