import * as actionTypes from '../action-types';
import {apiServiceController} from '../../../services';
import {apiServicesConfig} from '../../../util';

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

clientActionCreator.fetchFreeAgentsSuccess = (fetchedData) => {
    return {
        type: actionTypes.CLIENT_FETCH_FREE_AGENTS_SUCCESS,
        fetchedData
    };
};

clientActionCreator.fetchFreeAgentsFailure = (error) => {
    return {
        type: actionTypes.CLIENT_FETCH_FREE_AGENTS_FAILURE,
        error
    };
};

clientActionCreator.fetchFreeAgentsRequest = (queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLIENT_FETCH_FREE_AGENTS_REQUEST
        });
        apiServiceController(apiServicesConfig.crud.fetchDataOptions)
            .fetchFreeAgentsData(queryString)
                .then(response => {
                    dispatch(clientActionCreator.fetchFreeAgentsSuccess(response.data));
                })
                .catch(error => {
                    dispatch(clientActionCreator.fetchFreeAgentsFailure(error));
                });
    };
};

clientActionCreator.setReloadDataTrigger = (flag) => {
    return {
        type: actionTypes.CLIENT_SET_RELOAD_DATA_TRIGGER,
        flag
    };
};

clientActionCreator.showStartForm = () => {
    return {
        type: actionTypes.CLIENT_SHOW_START_FORM
    };
};

clientActionCreator.hideStartForm = () => {
    return {
        type: actionTypes.CLIENT_HIDE_START_FORM
    };
};

export default clientActionCreator;