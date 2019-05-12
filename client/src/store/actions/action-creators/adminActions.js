import * as actionTypes from '../action-types';
import { fetchDataService, createDataService, updateDataService, deleteDataService } from '../../../services/api';

export const fetchDataSuccess = (model, fetchedData) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        model: model,
        fetchedData: fetchedData
    };
};

export const fetchDataFailure = (error) => {
    return {
        type: actionTypes.FETCH_DATA_FAILURE,
        error: error
    };
};

export const fetchDataRequest = (accessToken, model, id, queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_DATA_REQUEST,
            model: model
        });
        fetchDataService(accessToken, model, id, queryString)
            .then(response => {
                dispatch(fetchDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    };
};

export const createDataSuccess = (model, createdData) => {
    return {
        type: actionTypes.CREATE_DATA_SUCCESS,
        model: model,
        createdData: createdData
    };
};

export const createDataFailure = (error) => {
    return {
        type: actionTypes.CREATE_DATA_FAILURE,
        error: error
    };
};

export const createDataRequest = (accessToken, model, dataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_DATA_REQUEST,
            model: model
        });
        createDataService(accessToken, model, dataObj)
            .then(response => {
                dispatch(createDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(createDataFailure(error));
            });
    };
};

export const updateDataSuccess = (model, updatedData) => {
    return {
        type: actionTypes.UPDATE_DATA_SUCCESS,
        model: model,
        updatedData: updatedData
    };
};

export const updateDataFailure = (error) => {
    return {
        type: actionTypes.UPDATE_DATA_FAILURE,
        error: error
    };
};

export const updateDataRequest = (accessToken, model, dataObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_DATA_REQUEST,
            model: model
        });
        updateDataService(accessToken, model, dataObj)
            .then(response => {
                dispatch(updateDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(updateDataFailure(error));
            });
    };
};

export const deleteDataSuccess = (model, deletedData) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        model: model,
        deletedData: deletedData
    };
};

export const deleteDataFailure = (error) => {
    return {
        type: actionTypes.DELETE_DATA_FAILURE,
        error: error
    };
};

export const deleteDataRequest = (accessToken, model, id, queryString) => {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_DATA_REQUEST,
            model: model
        });
        deleteDataService(accessToken, model, id, queryString)
            .then(response => {
                dispatch(updateDataSuccess(model, response.data));
            })
            .catch(error => {
                dispatch(updateDataFailure(error));
            });
    };
};