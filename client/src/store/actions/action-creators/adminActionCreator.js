import * as actionTypes from '../action-types';
import {apiServiceController} from '../../../services';
import {debounce, search, promiseToGetUniqueKeyValues, apiServicesConfig} from '../../../util';

const adminActionCreator = {};

adminActionCreator.resetFormFields = (model) => {
    return {
        type: actionTypes.ADMIN_RESET_FORM_FIELDS,
        model
    };
};

adminActionCreator.changeFormFieldValue = (model, formFieldKey, value = null, touched = true) => {
    return {
        type: actionTypes.ADMIN_CHANGE_FORM_FIELD_VALUE,
        model,
        formFieldKey,
        value,
        touched
    };
};

adminActionCreator.fetchDataSuccess = (model, fetchedData) => {
    return {
        type: actionTypes.ADMIN_FETCH_DATA_SUCCESS,
        model,
        fetchedData
    };
};

adminActionCreator.fetchDataFailure = (model, error) => {
    return {
        type: actionTypes.ADMIN_FETCH_DATA_FAILURE,
        model,
        error
    };
};

adminActionCreator.fetchDataRequest = (accessToken, model, id, queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADMIN_FETCH_DATA_REQUEST,
            model
        });
        apiServiceController(apiServicesConfig.crud.fetchDataOptions)
            .fetchData(accessToken, model, id, queryString)
                .then(response => {
                    dispatch(adminActionCreator.fetchDataSuccess(model, response.data));
                })
                .catch(error => {
                    dispatch(adminActionCreator.fetchDataFailure(model, error));
                });
    };
};

adminActionCreator.createDataSuccess = (model, createdData) => {
    return {
        type: actionTypes.ADMIN_CREATE_DATA_SUCCESS,
        model,
        createdData
    };
};

adminActionCreator.createDataFailure = (model, error) => {
    return {
        type: actionTypes.ADMIN_CREATE_DATA_FAILURE,
        model,
        error
    };
};

adminActionCreator.createDataRequest = (accessToken, model, dataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADMIN_CREATE_DATA_REQUEST,
            model
        });
        apiServiceController(apiServicesConfig.crud.createDataOptions)
            .createData(accessToken, model, dataObj)
                .then(response => {
                    dispatch(adminActionCreator.createDataSuccess(model, response.data));
                })
                .catch(error => {
                    dispatch(adminActionCreator.createDataFailure(model, error));
                });
    };
};

adminActionCreator.updateDataSuccess = (model, updatedData) => {
    return {
        type: actionTypes.ADMIN_UPDATE_DATA_SUCCESS,
        model,
        updatedData
    };
};

adminActionCreator.updateDataFailure = (model, error) => {
    return {
        type: actionTypes.ADMIN_UPDATE_DATA_FAILURE,
        model,
        error
    };
};

adminActionCreator.updateDataRequest = (accessToken, model, id, dataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADMIN_UPDATE_DATA_REQUEST,
            model
        });
        apiServiceController(apiServicesConfig.crud.updateDataOptions)
            .updateData(accessToken, model, id, dataObj)
                .then(response => {
                    dispatch(adminActionCreator.updateDataSuccess(model, response.data));
                })
                .catch(error => {
                    dispatch(adminActionCreator.updateDataFailure(model, error));
                });
    };
};

adminActionCreator.deleteDataSuccess = (model, deletedData) => {
    return {
        type: actionTypes.ADMIN_DELETE_DATA_SUCCESS,
        model,
        deletedData
    };
};

adminActionCreator.deleteDataFailure = (model, error) => {
    return {
        type: actionTypes.ADMIN_DELETE_DATA_FAILURE,
        model,
        error
    };
};

adminActionCreator.deleteDataRequest = (accessToken, model, id, queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADMIN_DELETE_DATA_REQUEST,
            model
        });
        apiServiceController(apiServicesConfig.crud.deleteDataOptions)
            .deleteData(accessToken, model, id, queryString)
                .then(response => {
                    dispatch(adminActionCreator.deleteDataSuccess(model, response.data));
                })
                .catch(error => {
                    dispatch(adminActionCreator.deleteDataFailure(model, error));
                });
    };
};

adminActionCreator.changeCurrentModel = (model) => {
    return {
        type: actionTypes.ADMIN_CHANGE_CURRENT_MODEL,
        model
    };
};

adminActionCreator.setReloadDataTrigger = (model, flag) => {
    return {
        type: actionTypes.ADMIN_SET_RELOAD_DATA_TRIGGER,
        model,
        flag
    };
};

adminActionCreator.toggleAllItemsSelect = (model, checked) => {
    return {
        type: actionTypes.ADMIN_TOGGLE_ALL_ITEMS_SELECT,
        model,
        checked
    };
};

adminActionCreator.toggleItemSelect = (model, id, checked) => {
    return {
        type: actionTypes.ADMIN_TOGGLE_ITEM_SELECT,
        model,
        id,
        checked
    };
};

adminActionCreator.setCurrentPage = (model, activePage) => {
    return {
        type: actionTypes.ADMIN_SET_CURRENT_PAGE,
        model,
        activePage
    };
};

adminActionCreator.setItemsPerPage = (model, value) => {
    return {
        type: actionTypes.ADMIN_SET_ITEMS_PER_PAGE,
        model,
        value
    };
};

adminActionCreator.setTotalItems = (model, total) => {
    return {
        type: actionTypes.ADMIN_SET_TOTAL_ITEMS,
        model,
        total
    };
};

adminActionCreator.setListItemsIds = (model, ids) => {
    return {
        type: actionTypes.ADMIN_SET_LIST_ITEMS_IDS,
        model,
        ids
    };
};

adminActionCreator.setListData = (model, dataSet) => {
    return {
        type: actionTypes.ADMIN_SET_LIST_DATA,
        model,
        dataSet
    };
};

adminActionCreator.searchDataInit = (model) => {
    return {
        type: actionTypes.ADMIN_SEARCH_DATA_INIT,
        model
    };
};

adminActionCreator.searchDataComplete = (model, ids) => {
    return {
        type: actionTypes.ADMIN_SEARCH_DATA_COMPLETE,
        model,
        ids
    };
};

adminActionCreator.searchDataRequest = (model, text, getDataSet, key) => {
    return dispatch => {
        dispatch(adminActionCreator.searchDataInit(model));
        debounce(() => {
            let searchResult = search(text, getDataSet(), key);
            dispatch(adminActionCreator.searchDataComplete(model, searchResult));
            dispatch(adminActionCreator.setListItemsIds(model, searchResult));
        }, 500)();
    };
};

adminActionCreator.changeSearchValue = (model, value) => {
    return {
        type: actionTypes.ADMIN_CHANGE_SEARCH_VALUE,
        model,
        value
    };
};

adminActionCreator.changeSortState = (model, target, order, reverse) => {
    return {
        type: actionTypes.ADMIN_CHANGE_SORT_STATE,
        model,
        target,
        order,
        reverse
    };
};

adminActionCreator.addFilter = (model, filterKey) => {
    return {
        type: actionTypes.ADMIN_ADD_FILTER,
        model,
        filterKey
    };
};

adminActionCreator.deleteFilter = (model, filterKey) => {
    return {
        type: actionTypes.ADMIN_DELETE_FILTER,
        model,
        filterKey
    };
};

adminActionCreator.setFilterOptions = (model, filterKey, options) => {
    return {
        type: actionTypes.ADMIN_SET_FILTER_OPTIONS,
        model,
        filterKey,
        options
    };
};

adminActionCreator.setFilterTarget = (model, filterKey, target) => {
    return {
        type: actionTypes.ADMIN_SET_FILTER_TARGET,
        model,
        filterKey,
        target
    };
};

adminActionCreator.loadFilterOptions = (filterKey, dataKey, model, getDataSet) => {
    return dispatch => {
        promiseToGetUniqueKeyValues(dataKey, getDataSet)
            .then((uniqueKeyValues) => {
                dispatch(adminActionCreator.setFilterOptions(model, filterKey, uniqueKeyValues));
            })
            .catch((e) => {
                dispatch(adminActionCreator.setFilterOptions(model, filterKey, []));
            })
    };
};

adminActionCreator.setCustomFields = (model, customFields) => {
    return {
        type: actionTypes.ADMIN_SET_CUSTOM_FIELDS,
        model,
        customFields
    };
};

adminActionCreator.setUpdatedItem = (model, updatedItem) => {
    return {
        type: actionTypes.ADMIN_SET_UPDATED_ITEM,
        model,
        updatedItem
    };
};

export default adminActionCreator;