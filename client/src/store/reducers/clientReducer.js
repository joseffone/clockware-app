import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput} from '../../util';
import clientFormTypesConfig from '../../util/presets/clientFormTypesConfig';

const initState = {
    forms: {}
};

for (const key in clientFormTypesConfig) {
    initState.forms[key] = {
        ...clientFormTypesConfig[key]
    };
}

const clientReducer = (state = initState, action) => {

    switch (action.type) {

        case actionTypes.CLIENT_REFRESH_FORM_STATE:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.formKey]: {
                        ...clientFormTypesConfig[action.formKey]
                    }
                })
            });

        case actionTypes.CLIENT_CHANGE_FORM_STATE:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.formKey]:  rewriteObjectProps(state.forms[action.formKey], {
                        [action.formFieldKey]: rewriteObjectProps(state.forms[action.formKey][action.formFieldKey], {
                            value: action.value || action.event.target.value,
                            isValid: validateInput(action.value || action.event.target.value || '', state.forms[action.formKey][action.formFieldKey].config.restrictions),
                            touched: action.touched
                        })
                    })
                })
            });

        default:
            return state;
    
    };
};

export default clientReducer;