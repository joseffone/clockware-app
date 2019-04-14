import * as actionTypes from '../action-types';

export const refreshInpFormState = (model) => {
    return {
        type: actionTypes.REFRESH_INPUT_FORM_STATE,
        model: model
    };
};

export const changeInpFormState = (event, model, formFieldKey) => {
    return {
        type: actionTypes.CHANGE_INPUT_FORM_STATE,
        event: event,
        model: model,
        formFieldKey: formFieldKey
    };
};
