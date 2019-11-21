import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput, clientFormTypesConfig} from '../../util';

const initState = {
    forms: {},
    data: {
        freeAgents: [],
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
        params: {
            fields: [],
            filters: [],
            sort: {
                target: null,
                isDate: false,
                reverse: false,
                options: [
                    {
                        key: 'first_name',
                        text: 'First name',
                        value: 'first_name'
                    },
                    {
                        key: 'last_name',
                        text: 'Last name',
                        value: 'last_name'
                    },
                    {
                        key: 'ratingValue',
                        text: 'Rating',
                        value: 'ratingValue'
                    }
                ]
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
                    freeAgents: [...action.fetchedData]
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
                    freeAgents: []
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

        case actionTypes.CLIENT_SET_CURRENT_PAGE:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    params: rewriteObjectProps(state.list.params, {
                        pagination: rewriteObjectProps(state.list.params.pagination, {
                            currentPage: action.activePage
                        })
                    })
                })
            });

        case actionTypes.CLIENT_SET_ITEMS_PER_PAGE:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    params: rewriteObjectProps(state.list.params, {
                        pagination: rewriteObjectProps(state.list.params.pagination, {
                            itemsPerPage: action.value
                        })
                    })
                })
            });

        case actionTypes.CLIENT_SET_TOTAL_ITEMS:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    params: rewriteObjectProps(state.list.params, {
                        pagination: rewriteObjectProps(state.list.params.pagination, {
                            totalItems: action.total
                        })
                    })
                })
            });

        case actionTypes.CLIENT_SET_LIST_ITEMS_IDS:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    ids: action.ids.slice()
                })
            });

        case actionTypes.CLIENT_SET_LIST_DATA:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    dataSet: action.dataSet.slice()
                })
            });

        case actionTypes.CLIENT_CHANGE_SORT_TARGET:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    params: rewriteObjectProps(state.list.params, {
                        sort: rewriteObjectProps(state.list.params.sort, {
                            target: action.target
                        })
                    })
                })
            });

        case actionTypes.CLIENT_CHANGE_SORT_ORDER:
            return rewriteObjectProps(state, {
                list: rewriteObjectProps(state.list, {
                    params: rewriteObjectProps(state.list.params, {
                        sort: rewriteObjectProps(state.list.params.sort, {
                            reverse: action.reverse
                        })
                    })
                })
            });
    
        default:
            return state;
    
    };
};

export default clientReducer;