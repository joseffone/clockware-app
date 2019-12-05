import * as actionTypes from '../action-types';
import {apiServiceController} from '../../../services';
import {apiServicesConfig} from '../../../util';

const clientActionCreator = {};

clientActionCreator.resetFormFields = (formKey) => {
    return {
        type: actionTypes.CLIENT_RESET_FORM_FIELDS,
        formKey
    };
};

clientActionCreator.changeFormFieldValue = (event, formKey, formFieldKey, value = null, touched = true) => {
    return {
        type: actionTypes.CLIENT_CHANGE_FORM_FIELD_VALUE,
        event,
        formKey,
        formFieldKey,
        value,
        touched
    };
};

clientActionCreator.changeFormFieldConfig = (formKey, formFieldKey, newConfig) => {
    return {
        type: actionTypes.CLIENT_CHANGE_FORM_FIELD_CONFIG,
        formKey,
        formFieldKey,
        newConfig
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

clientActionCreator.createReservationSuccess = (createdData) => {
    return {
        type: actionTypes.CLIENT_CREATE_RESERVATION_SUCCESS,
        createdData
    };
};

clientActionCreator.createReservationFailure = (error) => {
    return {
        type: actionTypes.CLIENT_CREATE_RESERVATION_FAILURE,
        error
    };
};

clientActionCreator.createReservationRequest = (reservationData) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLIENT_CREATE_RESERVATION_REQUEST
        });
        apiServiceController(apiServicesConfig.crud.createDataOptions)
            .createData(null, 'users', {
                email: reservationData.email,
                first_name: reservationData.first_name,
                last_name: reservationData.last_name,
                password: reservationData.email
            }).then(response => {
                let clientId = response.data[0].id;
                apiServiceController(apiServicesConfig.auth.loginUserOptions)
                    .loginUser({email: reservationData.email, password: reservationData.email})
                        .then(response => {
                            let accToken = response.data.access_token;
                            apiServiceController(apiServicesConfig.crud.createDataOptions)
                                .createData(accToken, 'orders', {
                                    ...reservationData,
                                    user_id: clientId
                                })
                                .then(response => {
                                    dispatch(clientActionCreator.createReservationSuccess(response.data));
                                    apiServiceController(apiServicesConfig.auth.logoutUserOptions).logoutUser(accToken);
                                })
                                .catch(error => {
                                    dispatch(clientActionCreator.createReservationFailure(error));
                                });
                        })
                        .catch(error => {
                            dispatch(clientActionCreator.createReservationFailure(error));
                        });
            })
            .catch(error => {
                dispatch(clientActionCreator.createReservationFailure(error));
            });
    };
};

clientActionCreator.resetReservingResults = () => {
    return {
        type: actionTypes.CLIENT_RESET_RESERVING_RESULTS
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

clientActionCreator.changeFilterTarget = (filterKey, checked, id) => {
    return {
        type: actionTypes.CLIENT_CHANGE_FILTER_TARGET,
        filterKey,
        checked,
        id
    };
};

export default clientActionCreator;