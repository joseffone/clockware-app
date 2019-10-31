import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';

const initState = {
    ui: {
        mobile: false,
        isSideBarOpen: false,
        isSideBarButtonPressed: false
    }
};

const globalReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.GLOBAL_CHANGE_DISPLAY_VIEW:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    mobile: action.mobile
                })
            });

        case actionTypes.GLOBAL_TOGGLE_SIDEBAR:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    isSideBarOpen: !state.ui.isSideBarOpen,
                    isSideBarAnimationFinished: false
                })
            });

        case actionTypes.GLOBAL_TOGGLE_SIDEBAR_BUTTON_PRESS:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    isSideBarButtonPressed: !state.ui.isSideBarButtonPressed,
                })
            });
        
        default:
            return state;

    }
};

export default globalReducer;