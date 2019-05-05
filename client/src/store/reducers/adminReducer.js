import * as actionTypes from '../actions/action-types';

import formTypesConfig from '../../util/presets/formTypesConfig';

const initState = {};

for (const key in formTypesConfig) {
    initState[key] = {
        items: null,
        activeItem: null,
        addedItem: null,
        updatedItem: null,
        deletedItems: null,
        filter: null,
        error: null,
        isLoading: false
    };
}

const adminReducer = (state = initState, action) => {
    return state;
};

export default adminReducer;