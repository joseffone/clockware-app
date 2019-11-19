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

clientActionCreator.setCurrentPage = (activePage) => {
    return {
        type: actionTypes.CLIENT_SET_CURRENT_PAGE,
        activePage
    };
};

clientActionCreator.setItemsPerPage = (value) => {
    return {
        type: actionTypes.CLIENT_SET_ITEMS_PER_PAGE,
        value
    };
};

clientActionCreator.setTotalItems = (total) => {
    return {
        type: actionTypes.CLIENT_SET_TOTAL_ITEMS,
        total
    };
};

clientActionCreator.setListItemsIds = (ids) => {
    return {
        type: actionTypes.CLIENT_SET_LIST_ITEMS_IDS,
        ids
    };
};

clientActionCreator.setListData = (dataSet) => {
    return {
        type: actionTypes.CLIENT_SET_LIST_DATA,
        dataSet
    };
};

clientActionCreator.changeSortTarget = (target) => {
    return {
        type: actionTypes.CLIENT_CHANGE_SORT_TARGET,
        target
    };
};

clientActionCreator.changeSortOrder = (reverse) => {
    return {
        type: actionTypes.CLIENT_CHANGE_SORT_ORDER,
        reverse
    };
};

export default clientActionCreator;