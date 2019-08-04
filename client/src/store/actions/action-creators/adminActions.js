import * as actionTypes from '../action-types';
import { fetchDataService, createDataService, updateDataService, deleteDataService } from '../../../services/api';

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

export const changeCurrentModel = (modelName) => {
    return {
        type: actionTypes.CHANGE_CURRENT_MODEL,
        modelName
    };
};

export const setReloadDataTrigger = (flag) => {
    return {
        type: actionTypes.SET_RELOAD_DATA_TRIGGER,
        flag
    };
};

export const setSelectAllTrigger = (checked) => {
    return {
        type: actionTypes.SET_SELECT_ALL_TRIGGER,
        checked
    };
};

export const toggleListItemSelect = (checked, id) => {
    return {
        type: actionTypes.TOGGLE_LIST_ITEM_SELECT,
        checked,
        id
    };
};