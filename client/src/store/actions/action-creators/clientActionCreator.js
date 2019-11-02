import * as actionTypes from '../action-types';

const clientActionCreator = {};

clientActionCreator.refreshFormState = (formKey) => {
    return {
        type: actionTypes.CLIENT_REFRESH_FORM_STATE,
        formKey
    };
};

clientActionCreator.changeFormState = (event, formKey, formFieldKey, value = null, touched = true) => {
    return {
        type: actionTypes.CLIENT_CHANGE_FORM_STATE,
        event,
        formKey,
        formFieldKey,
        value,
        touched
    };
};

export default clientActionCreator;