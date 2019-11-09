import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput} from '../../util';
import clientFormTypesConfig from '../../util/presets/clientFormTypesConfig';

const initState = {
    forms: {},
    data: {
        freeAgentsIds: [],
        order: null,
        error: {
            fetchError: null,
            createError: null
        },
        loading: {
            isFetching: false,
            isCreating: false
        }
    },
    list: {
        dataSet: [],
        ids: [],
        activeId: null,
        selectedIds: [],
        params: {
            fields: [],
            filters: [],
            sort: {
                target: null,
                isDate: false,
                order: null,
                reverse: false
            },
            search: {
                isLoading: false,
                results: [],
                value: ''
            },
            pagination: {
                currentPage: 1,
                itemsPerPage: 5,
                totalItems: null
            }
        }
    },
    ui: {
        isStartPageShown: true,
        reloadDataTrigger: false,
        itemsPerPageOptions: [
            {
                key: 5,
                text: '5',
                value: 5
            },
            {
                key: 10,
                text: '10',
                value: 10
            },
            {
                key: 15,
                text: '15',
                value: 15
            }
        ]
    }
};

for (const key in clientFormTypesConfig) {
    initState.forms[key] = {
        ...clientFormTypesConfig[key]
    };
}

const clientReducer = (state = initState, action) => {

    switch (action.type) {

        case actionTypes.CLIENT_REFRESH_FORM_STATE:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.formKey]: {
                        ...clientFormTypesConfig[action.formKey]
                    }
                })
            });

        case actionTypes.CLIENT_CHANGE_FORM_STATE:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.formKey]:  rewriteObjectProps(state.forms[action.formKey], {
                        [action.formFieldKey]: rewriteObjectProps(state.forms[action.formKey][action.formFieldKey], {
                            value: action.value || action.event.target.value,
                            isValid: validateInput(action.value || action.event.target.value || '', state.forms[action.formKey][action.formFieldKey].config.restrictions),
                            touched: action.touched
                        })
                    })
                })
            });

        case actionTypes.CLIENT_FETCH_FREE_AGENTS_REQUEST:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    loading: rewriteObjectProps(state.data.loading, {
                        isFetching: true
                    }),
                    error: rewriteObjectProps(state.data.error, {
                        fetchError: null
                    })
                })
            });

        case actionTypes.CLIENT_FETCH_FREE_AGENTS_SUCCESS:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    loading: rewriteObjectProps(state.data.loading, {
                        isFetching: false
                    }),
                    freeAgentsIds: [...action.fetchedData]
                }),
                list: rewriteObjectProps(state.list, {
                    ids: action.fetchedData.map(({id}) => id)
                }),
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: false
                })
            });

        case actionTypes.CLIENT_FETCH_FREE_AGENTS_FAILURE:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    loading: rewriteObjectProps(state.data.loading, {
                        isFetching: false
                    }),
                    error: rewriteObjectProps(state.data.error, {
                        fetchError: action.error
                    }),
                    freeAgentsIds: []
                }),
                list: rewriteObjectProps(state.list, {
                    ids: []
                }),
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: false
                })
            });

        case actionTypes.CLIENT_SET_RELOAD_DATA_TRIGGER:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: action.flag
                }),
                list: rewriteObjectProps(state.list, {
                    params: rewriteObjectProps(state.list.params, {
                        pagination: rewriteObjectProps(state.list.params.pagination, {
                            currentPage: action.flag ? 1 : state.list.params.pagination.currentPage
                        })
                    })
                })
            });

        case actionTypes.CLIENT_SHOW_START_FORM:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    isStartPageShown: true
                })
            });

        case actionTypes.CLIENT_HIDE_START_FORM:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    isStartPageShown: false
                })
            });
    
        default:
            return state;
    
    };
};

export default clientReducer;