import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput} from '../../util';
import clientFormTypesConfig from '../../util/presets/clientFormTypesConfig';

const initState = {};

for (const key in clientFormTypesConfig) {
    initState[key] = {...clientFormTypesConfig[key]};
}

const clientReducer = (state = initState, action) => {
    return state;
};

export default clientReducer;