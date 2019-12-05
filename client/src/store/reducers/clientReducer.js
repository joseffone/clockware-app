import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput, clientFormTypesConfig, getUniqueKeyValues, applyParams} from '../../util';

const initState = {
    forms: {},
    data: {
        freeAgents: [],
        reservation: null,
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
            filters: [
                {
                    rating: {
                        operatorType: 'equal',
                        dataKey: 'rating_value',
                        isDate: false,
                        target: [],
                        options: []
                    }
                },
                {
                    cities: {
                        operatorType: 'equal',
                        dataKey: 'cities',
                        isDate: false,
                        target: [],
                        options: []
                    }
                }
            ],
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
                        key: 'rating_value',
                        text: 'Rating',
                        value: 'rating_value'
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

        case actionTypes.CLIENT_RESET_FORM_FIELDS:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.formKey]: {
                        ...clientFormTypesConfig[action.formKey]
                    }
                })
            });

        case actionTypes.CLIENT_CHANGE_FORM_FIELD_VALUE:
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

        case actionTypes.CLIENT_CHANGE_FORM_FIELD_CONFIG:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.formKey]: rewriteObjectProps(state.forms[action.formKey], {
                        [action.formFieldKey]: rewriteObjectProps(state.forms[action.formKey][action.formFieldKey], {
                            config: rewriteObjectProps(state.forms[action.formKey][action.formFieldKey].config, action.newConfig)
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

        case actionTypes.CLIENT_CREATE_RESERVATION_REQUEST:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    loading: rewriteObjectProps(state.data.loading, {
                        isCreating: true
                    }),
                    error: rewriteObjectProps(state.data.error, {
                        createError: null
                    }),
                    reservation: null
                })
            });

        case actionTypes.CLIENT_CREATE_RESERVATION_SUCCESS:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    loading: rewriteObjectProps(state.data.loading, {
                        isCreating: false
                    }),
                    reservation: {...action.createdData}
                })
            });

        case actionTypes.CLIENT_CREATE_RESERVATION_FAILURE:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    loading: rewriteObjectProps(state.data.loading, {
                        isCreating: false
                    }),
                    reservation: null,
                    error: rewriteObjectProps(state.data.error, {
                        createError: action.error
                    })
                })
            });

        case actionTypes.CLIENT_RESET_RESERVING_RESULTS:
            return rewriteObjectProps(state, {
                data: rewriteObjectProps(state.data, {
                    reservation: null,
                    error: rewriteObjectProps(state.data.error, {
                        createError: null
                    })
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
            {
                let newDataSet = action.dataSet.slice();
                return rewriteObjectProps(state, {
                    list: rewriteObjectProps(state.list, {
                        dataSet: newDataSet,
                        params: rewriteObjectProps(state.list.params, {
                            filters: state.list.params.filters.map(filter => {
                                let options = getUniqueKeyValues(newDataSet, Object.values(filter)[0].dataKey);
                                return rewriteObjectProps(filter, {
                                    [Object.keys(filter)[0]]: rewriteObjectProps(Object.values(filter)[0], {
                                        target: [...options],
                                        options: [...options]
                                    })
                                })
                            })
                        })
                    })
                });
            }

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
        
        case actionTypes.CLIENT_CHANGE_FILTER_TARGET:
            {
                let dataSet = state.list.dataSet.slice();
                let filters = state.list.params.filters;
                let filter = filters.find(filter => filter[action.filterKey]);
                let index = filters.findIndex(filter => filter[action.filterKey]);
                let id = +action.id !== +action.id ? action.id : +action.id;
                let newFilter = rewriteObjectProps(filter, {
                    [action.filterKey]: rewriteObjectProps(filter[action.filterKey], {
                        target: action.id ?
                            action.checked ? [...filter[action.filterKey].target, id] : filter[action.filterKey].target.filter(elem => elem !== id) : 
                            action.checked ? [...filter[action.filterKey].options] : []
                    })
                });
                let updatedFilters = [].concat(newFilter, filters.slice(0, index), filters.slice(index + 1, filters.length));
                return rewriteObjectProps(state, {
                    list: rewriteObjectProps(state.list, {
                        params: rewriteObjectProps(state.list.params, {
                            filters: updatedFilters
                                .map(filter => {
                                    if (Object.keys(filter)[0] !== action.filterKey) {
                                        let checkedOptions = getUniqueKeyValues(
                                            applyParams(dataSet, null, updatedFilters, 1), 
                                            Object.values(filter)[0].dataKey
                                        );
                                        return rewriteObjectProps(filter, {
                                            [Object.keys(filter)[0]]: rewriteObjectProps(filter[Object.keys(filter)[0]], {
                                                target: [...checkedOptions]
                                            })
                                        })
                                    }
                                    return filter;
                                })
                        })
                    })
                });
            }
    
        default:
            return state;
    
    };
};

export default clientReducer;