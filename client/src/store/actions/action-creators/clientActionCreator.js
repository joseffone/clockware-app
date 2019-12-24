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

clientActionCreator.changeFormFieldValue = (formKey, formFieldKey, value = null, touched = true) => {
    return {
        type: actionTypes.CLIENT_CHANGE_FORM_FIELD_VALUE,
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

clientActionCreator.sendEmailSuccess = (emailInfo) => {
    return {
        type: actionTypes.CLIENT_SEND_EMAIL_SUCCESS,
        emailInfo
    };
};

clientActionCreator.sendEmailFailure = (error) => {
    return {
        type: actionTypes.CLIENT_SEND_EMAIL_FAILURE,
        error
    };
};

clientActionCreator.sendEmailRequest = (accessToken, emailData) => {
    return async dispatch => {
        let accessTokenToUse = accessToken;
        dispatch({
            type: actionTypes.CLIENT_SEND_EMAIL_REQUEST
        });
        if (!accessTokenToUse) {
            await apiServiceController(apiServicesConfig.auth.loginUserOptions)
                .loginUser({email: emailData.email, password: emailData.password})
                    .then(response => {
                        accessTokenToUse = response.data.access_token;
                    })
                    .catch(error => {
                        dispatch(clientActionCreator.sendEmailFailure({...error, stage: 'email'}));
                    });
            if (!accessTokenToUse) return;
        }
        apiServiceController(apiServicesConfig.crud.sendEmailOptions)
            .sendEmail(accessTokenToUse, {
                order_id: emailData.order_id,
                link: emailData.link,
                city_name: emailData.city_name,
                clock_type: emailData.clock_type,
                agent_first_name: emailData.agent_first_name,
                agent_last_name: emailData.agent_last_name,
                start_date: emailData.start_date,
                expiration_date: emailData.expiration_date
            })
                .then(response => {
                    dispatch(clientActionCreator.sendEmailSuccess(response.data));
                    apiServiceController(apiServicesConfig.auth.logoutUserOptions).logoutUser(accessTokenToUse);
                })
                .catch(error => {
                    dispatch(clientActionCreator.sendEmailFailure({...error, stage: 'email'}));
                    apiServiceController(apiServicesConfig.auth.logoutUserOptions).logoutUser(accessTokenToUse);
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

clientActionCreator.createReservationRequest = (reservationData, isSignup) => {
    return async dispatch => {
        let isUserCreated = false, isSignupSucceed = false;
        dispatch({
            type: actionTypes.CLIENT_CREATE_RESERVATION_REQUEST
        });
        if (isSignup) {
            await apiServiceController(apiServicesConfig.crud.createDataOptions)
                .createData(null, 'users', {
                    email: reservationData.email,
                    first_name: reservationData.first_name,
                    last_name: reservationData.last_name,
                    password: reservationData.password
                }).then(response => {
                    isSignupSucceed = true;
                    isUserCreated = response.data[1];
                })
                .catch(error => {
                    dispatch(clientActionCreator.createReservationFailure({...error, stage: 'signup'}));
                });
            if (!isSignupSucceed) return;
        }
        apiServiceController(apiServicesConfig.auth.loginUserOptions)
            .loginUser({email: reservationData.email, password: reservationData.password})
                .then(response => {
                    let accessToken = response.data.access_token;
                    apiServiceController(apiServicesConfig.crud.createDataOptions)
                        .createData(accessToken, 'orders', {
                            user_id: response.data.user_id,
                            clock_id: reservationData.clock_id,
                            city_id: reservationData.city_id,
                            agent_id: reservationData.agent_id,
                            start_date: reservationData.start_date,
                            expiration_date: reservationData.expiration_date,
                            note: reservationData.note
                        })
                        .then(response => {
                            dispatch(clientActionCreator.createReservationSuccess(response.data));
                            dispatch(clientActionCreator.sendEmailRequest(accessToken, {
                                order_id: response.data[0].id,
                                link: reservationData.link,
                                city_name: reservationData.city_name,
                                clock_type: reservationData.clock_type,
                                agent_first_name: reservationData.agent_first_name,
                                agent_last_name: reservationData.agent_last_name,
                                start_date: reservationData.start_date,
                                expiration_date: reservationData.expiration_date
                            }));
                        })
                        .catch(error => {
                            let isTerminated = error.response.data.error 
                                ? error.response.data.error.message.indexOf('Order creating terminated.') !== -1 
                                : false;
                            dispatch(clientActionCreator.createReservationFailure({
                                ...error, 
                                stage: isUserCreated && isSignup 
                                    ? isTerminated 
                                        ? 'reserve-after-singup-terminated' 
                                        : 'reserve-after-singup' 
                                    : isTerminated 
                                        ? 'reserve-terminated' 
                                        : 'reserve'
                            }));
                            apiServiceController(apiServicesConfig.auth.logoutUserOptions).logoutUser(accessToken);
                        });
                })
                .catch(error => {
                    dispatch(clientActionCreator.createReservationFailure({
                        ...error, 
                        stage: !isUserCreated && isSignup 
                            ? 're-signup' 
                            : isUserCreated && isSignup 
                                ? 'login-after-signup' 
                                : 'login'
                    }));
                });
    };
};

clientActionCreator.confirmReservationSuccess = (updatedData) => {
    return {
        type: actionTypes.CLIENT_CONFIRM_RESERVATION_SUCCESS,
        updatedData
    };
};

clientActionCreator.confirmReservationFailure = (error) => {
    return {
        type: actionTypes.CLIENT_CONFIRM_RESERVATION_FAILURE,
        error
    };
};

clientActionCreator.confirmReservationRequest = (confirmToken) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLIENT_CONFIRM_RESERVATION_REQUEST
        });
        apiServiceController(apiServicesConfig.crud.updateDataOptions)
            .confirmReservation(confirmToken)
                .then(response => {
                    dispatch(clientActionCreator.confirmReservationSuccess(response.data));
                })
                .catch(error => {
                    dispatch(clientActionCreator.confirmReservationFailure(error));
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

clientActionCreator.toggleActiveForm = () => {
    return {
        type: actionTypes.CLIENT_TOGGLE_ACTIVE_FORM
    };
};

export default clientActionCreator;