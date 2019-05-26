import * as actionTypes from '../action-types';

export const refreshInpFormState = (model) => {
    return {
        type: actionTypes.REFRESH_INPUT_FORM_STATE,
        model
    };
};

export const changeInpFormState = (event, model, formFieldKey, value = null) => {
    return {
        type: actionTypes.CHANGE_INPUT_FORM_STATE,
        event,
        model,
        formFieldKey,
        value
    };
};

export const setSelectOptions = (modelToEdit, source, items) => {
    return {
        type: actionTypes.SET_SELECT_OPTIONS,
        modelToEdit,
        source,
        items
    };
};
