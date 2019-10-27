import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput} from '../../util';
import clientFormTypesConfig from '../../util/presets/clientFormTypesConfig';

const initState = {
    forms: {}
};

for (const key in clientFormTypesConfig) {
    initState.forms[key] = {...clientFormTypesConfig[key]};
}

const clientReducer = (state = initState, action) => {
    return state;
};

export default clientReducer;