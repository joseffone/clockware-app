import * as actionTypes from '../action-types';
import { fetchDataService, createDataService, updateDataService, deleteDataService } from '../../../services/api';
import { debounce, search, promiseToGetUniqueKeyValues } from '../../../util';

export const fetchDataSuccess = (model, fetchedData) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        model,
        fetchedData
    };
};

export const fetchDataFailure = (model, error) => {
    return {
        type: actionTypes.FETCH_DATA_FAILURE,
        model,
        error
    };
};

export const fetchDataRequest = (accessToken, model, id, queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_DATA_REQUEST,
            model
        });
        fetchDataService(accessToken, model, id, queryString)
            .then(response => {
                dispatch(fetchDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(fetchDataFailure(model, error));
            });
    };
};

export const createDataSuccess = (model, createdData) => {
    return {
        type: actionTypes.CREATE_DATA_SUCCESS,
        model,
        createdData
    };
};

export const createDataFailure = (model, error) => {
    return {
        type: actionTypes.CREATE_DATA_FAILURE,
        model,
        error
    };
};

export const createDataRequest = (accessToken, model, dataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_DATA_REQUEST,
            model
        });
        createDataService(accessToken, model, dataObj)
            .then(response => {
                dispatch(createDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(createDataFailure(model, error));
            });
    };
};

export const updateDataSuccess = (model, updatedData) => {
    return {
        type: actionTypes.UPDATE_DATA_SUCCESS,
        model,
        updatedData
    };
};

export const updateDataFailure = (model, error) => {
    return {
        type: actionTypes.UPDATE_DATA_FAILURE,
        model,
        error
    };
};

export const updateDataRequest = (accessToken, model, id, dataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_DATA_REQUEST,
            model
        });
        updateDataService(accessToken, model, id, dataObj)
            .then(response => {
                dispatch(updateDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(updateDataFailure(model, error));
            });
    };
};

export const deleteDataSuccess = (model, deletedData) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        model,
        deletedData
    };
};

export const deleteDataFailure = (model, error) => {
    return {
        type: actionTypes.DELETE_DATA_FAILURE,
        model,
        error
    };
};

export const deleteDataRequest = (accessToken, model, id, queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_DATA_REQUEST,
            model
        });
        deleteDataService(accessToken, model, id, queryString)
            .then(response => {
                dispatch(deleteDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(deleteDataFailure(model, error));
            });
    };
};

export const changeCurrentModel = (model) => {
    return {
        type: actionTypes.CHANGE_CURRENT_MODEL,
        model
    };
};

export const setReloadDataTrigger = (model, flag) => {
    return {
        type: actionTypes.SET_RELOAD_DATA_TRIGGER,
        model,
        flag
    };
};

export const setSelectAllTrigger = (model, checked) => {
    return {
        type: actionTypes.SET_SELECT_ALL_TRIGGER,
        model,
        checked
    };
};

export const toggleListItemSelect = (model, checked, id) => {
    return {
        type: actionTypes.TOGGLE_LIST_ITEM_SELECT,
        model,
        checked,
        id
    };
};

export const setCurrentPage = (model, activePage) => {
    return {
        type: actionTypes.SET_CURRENT_PAGE,
        model,
        activePage
    };
};

export const setItemsPerPage = (model, value) => {
    return {
        type: actionTypes.SET_ITEMS_PER_PAGE,
        model,
        value
    };
};

export const setTotalItems = (model, total) => {
    return {
        type: actionTypes.SET_TOTAL_ITEMS,
        model,
        total
    };
};

export const setListItemsIds = (model, ids) => {
    return {
        type: actionTypes.SET_LIST_ITEMS_IDS,
        model,
        ids
    };
};

export const setListData = (model, dataSet) => {
    return {
        type: actionTypes.SET_LIST_DATA,
        model,
        dataSet
    };
};

export const searchDataInit = (model) => {
    return {
        type: actionTypes.SEARCH_DATA_INIT,
        model
    };
};

export const searchDataComplete = (model, ids) => {
    return {
        type: actionTypes.SEARCH_DATA_COMPLETE,
        model,
        ids
    };
};

export const searchDataRequest = (model, text, getDataSet, key) => {
    return dispatch => {
        dispatch(searchDataInit(model));
        debounce(() => {
            let searchResult = search(text, getDataSet(), key);
            dispatch(searchDataComplete(model, searchResult));
            dispatch(setListItemsIds(model, searchResult));
        }, 500)();
    };
};

export const changeSearchValue = (model, value) => {
    return {
        type: actionTypes.CHANGE_SEARCH_VALUE,
        model,
        value
    };
};

export const changeSortState = (model, target, order, reverse) => {
    return {
        type: actionTypes.CHANGE_SORT_STATE,
        model,
        target,
        order,
        reverse
    };
};

export const addFilter = (model, filterKey) => {
    return {
        type: actionTypes.ADD_FILTER,
        model,
        filterKey
    };
};

export const deleteFilter = (model, filterKey) => {
    return {
        type: actionTypes.DELETE_FILTER,
        model,
        filterKey
    };
};

export const setFilterOptions = (model, filterKey, options) => {
    return {
        type: actionTypes.SET_FILTER_OPTIONS,
        model,
        filterKey,
        options
    };
};

export const setFilterTargetValue = (model, filterKey, value) => {
    return {
        type: actionTypes.SET_FILTER_TARGET_VALUE,
        model,
        filterKey,
        value
    };
};

export const loadFilterOptions = (filterKey, dataKey, model, getDataSet) => {
    return dispatch => {
        promiseToGetUniqueKeyValues(dataKey, getDataSet)
            .then((uniqueKeyValues) => {
                dispatch(setFilterOptions(model, filterKey, uniqueKeyValues));
            })
            .catch((e) => {
                dispatch(setFilterOptions(model, filterKey, []));
            })
    };
};