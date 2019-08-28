import * as actionTypes from '../actions/action-types';
import { getFormConfig, rewriteObjectProps, validateInput } from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';

const initState = {};

for (const key in formTypesConfig) {
    initState[key] = { ...getFormConfig(key) };
}

const formReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.REFRESH_INPUT_FORM_STATE:
            return rewriteObjectProps(state, {
                [action.model]: { ...getFormConfig(action.model) }
            });

        case actionTypes.CHANGE_INPUT_FORM_STATE:
            return rewriteObjectProps(state, {
                [action.model]:  rewriteObjectProps(state[action.model], {
                    [action.formFieldKey]: rewriteObjectProps(state[action.model][action.formFieldKey], {
                        value: action.value || action.event.target.value,
                        isValid: validateInput(action.value || action.event.target.value || '', state[action.model][action.formFieldKey].config.restrictions),
                        touched: action.touched
                    })
                })
            });

        default:
            return state;
            
    }
};

export default formReducer;