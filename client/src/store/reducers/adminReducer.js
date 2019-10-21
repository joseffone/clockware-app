import * as actionTypes from '../actions/action-types';
import {rewriteObjectProps, validateInput} from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';
import tableFieldsConfig from '../../util/presets/tableFieldsConfig';

const initState = {
    forms: {},
    models: {},
    lists: {},
    ui: {
        currentModel: 'users',
        reloadDataTrigger: false,
        reloadDataCounter: 0,
        errorDataCounter: [],
        models: [
            {
                name: 'users',
                icon: 'group'
            }, 
            {
                name: 'agents',
                icon: 'spy'
            }, 
            {
                name: 'marks',
                icon: 'trophy'
            },
            {
                name: 'cities',
                icon: 'building'
            },
            {
                name: 'clocks',
                icon: 'clock'
            },
            {
                name: 'coverage',
                icon: 'linkify'
            },
            {
                name: 'roles',
                icon: 'briefcase'
            },
            {
                name: 'permissions',
                icon: 'unlock alternate'
            },
            {
                name: 'orders',
                icon: 'dollar'
            }
        ],
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
                key: 25,
                text: '25',
                value: 25
            },
            {
                key: 50,
                text: '50',
                value: 50
            }
        ]
    }
};

for (const key in formTypesConfig) {
    initState.forms[key] = {
        ...formTypesConfig[key]
    };
    initState.models[key] = {
        items: [],
        createdItem: null,
        updatedItem: null,
        deletedItemIds: [],
        error: {
            fetchError: null,
            createError: null,
            updateError: null,
            deleteError: null
        },
        loading: {
            isFetching: false,
            isCreating: false,
            isUpdating: false,
            isDeleting: false
        }
    };
    initState.lists[key] = {
        dataSet: [],
        ids: [],
        activeId: null,
        selectedIds: [],
        params: {
            fields: key === 'authentication' ? [] : [...tableFieldsConfig[key]],
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
    };
}

const adminReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.REFRESH_INPUT_FORM_STATE:
            return rewriteObjectProps(state, {
                forms: rewriteObjectProps(state.forms, {
                    [action.model]: {...formTypesConfig[action.model]}
                })
            });
        
        case actionTypes.CHANGE_INPUT_FORM_STATE:
                return rewriteObjectProps(state, {
                    forms: rewriteObjectProps(state.forms, {
                        [action.model]:  rewriteObjectProps(state.forms[action.model], {
                            [action.formFieldKey]: rewriteObjectProps(state.forms[action.model][action.formFieldKey], {
                                value: action.value || action.event.target.value,
                                isValid: validateInput(action.value || action.event.target.value || '', state.forms[action.model][action.formFieldKey].config.restrictions),
                                touched: action.touched
                            })
                        })
                    })
                });

        case actionTypes.FETCH_DATA_REQUEST:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isFetching: true
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            fetchError: null
                        })
                    })
                }),
                ui: rewriteObjectProps(state.ui, {
                    reloadDataCounter: state.ui.reloadDataCounter + 1,
                    errorDataCounter: state.ui.errorDataCounter.filter(item => item !== action.model)
                }) 
            });

        case actionTypes.FETCH_DATA_SUCCESS:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isFetching: false
                        }),
                        items: [...action.fetchedData]
                    })
                }),
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        ids: action.fetchedData.map(({ id }) => id)
                    })
                }),
                ui: rewriteObjectProps(state.ui, {
                    reloadDataCounter: state.ui.reloadDataCounter - 1
                }) 
            });

        case actionTypes.FETCH_DATA_FAILURE:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isFetching: false
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            fetchError: action.error
                        })
                    })
                }),
                ui: rewriteObjectProps(state.ui, {
                    reloadDataCounter: state.ui.reloadDataCounter - 1,
                    errorDataCounter: [...state.ui.errorDataCounter.slice(), action.model]
                })
            });

        case actionTypes.CREATE_DATA_REQUEST:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isCreating: true
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            createError: null
                        })
                    })
                })
            });

        case actionTypes.CREATE_DATA_SUCCESS:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isCreating: false
                        }),
                        createdItem: {...action.createdData[0]}
                    })
                })
            });
        
        case actionTypes.CREATE_DATA_FAILURE:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isCreating: false
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            createError: action.error
                        })
                    })
                })
            });


        case actionTypes.UPDATE_DATA_REQUEST:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isUpdating: true
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            updateError: null
                        })
                    })
                })
            });
        
        case actionTypes.UPDATE_DATA_SUCCESS:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isUpdating: false
                        }),
                        updatedItem: {...action.updatedData}
                    })
                })
            });

        case actionTypes.UPDATE_DATA_FAILURE:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isUpdating: false
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            updateError: action.error
                        })
                    })
                })
            });

        case actionTypes.DELETE_DATA_REQUEST:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isDeleting: true
                        }),
                        deletedItemIds: [],
                        error: rewriteObjectProps(state.models[action.model].error, {
                            deleteError: null
                        })
                    })
                })
            });

        case actionTypes.DELETE_DATA_SUCCESS:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isDeleting: false
                        }),
                        deletedItemIds: [...action.deletedData.id]
                    })
                })
            });

        case actionTypes.DELETE_DATA_FAILURE:
            return rewriteObjectProps(state, {
                models: rewriteObjectProps(state.models, {
                    [action.model]: rewriteObjectProps(state.models[action.model], {
                        loading: rewriteObjectProps(state.models[action.model].loading, {
                            isDeleting: false
                        }),
                        error: rewriteObjectProps(state.models[action.model].error, {
                            deleteError: action.error
                        })
                    })
                })
            });

        case actionTypes.CHANGE_CURRENT_MODEL:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    currentModel: action.model,
                    reloadDataTrigger: true,
                    errorDataCounter: []
                }),
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            pagination: rewriteObjectProps(state.lists[action.model].params.pagination, {
                                currentPage: 1
                            })
                        })
                    })
                })
            });

        case actionTypes.SET_RELOAD_DATA_TRIGGER:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: action.flag
                }),
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            pagination: rewriteObjectProps(state.lists[action.model].params.pagination, {
                                currentPage: action.flag ? 1 : state.lists[action.model].params.pagination.currentPage
                            })
                        })
                    })
                })
            });

        case actionTypes.SET_SELECT_ALL_TRIGGER:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        selectedIds: action.checked ? state.lists[action.model].ids.slice() : []
                    })
                })
            });
        
        case actionTypes.TOGGLE_LIST_ITEM_SELECT:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        selectedIds: action.checked ? [...state.lists[action.model].selectedIds.slice(), +action.id] : state.lists[action.model].selectedIds.filter(selectedId => selectedId !== +action.id)
                    })
                })
            });

        case actionTypes.SET_CURRENT_PAGE:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            pagination: rewriteObjectProps(state.lists[action.model].params.pagination, {
                                currentPage: action.activePage
                            })
                        })
                    })
                })
            });
        
        case actionTypes.SET_ITEMS_PER_PAGE:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            pagination: rewriteObjectProps(state.lists[action.model].params.pagination, {
                                itemsPerPage: action.value
                            })
                        })
                    })
                })
            });

        case actionTypes.SET_TOTAL_ITEMS:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            pagination: rewriteObjectProps(state.lists[action.model].params.pagination, {
                                totalItems: action.total
                            })
                        })
                    })
                })
            });

        case actionTypes.SET_LIST_ITEMS_IDS:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        ids: action.ids.slice()
                    })
                })
            });

        case actionTypes.SET_LIST_DATA:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        dataSet: action.dataSet.slice()
                    })
                })
            });

        case actionTypes.SEARCH_DATA_INIT:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            search: rewriteObjectProps(state.lists[action.model].params.search, {
                                isLoading: true,
                                results: []
                            })
                        })
                    })
                })
            });

        case actionTypes.SEARCH_DATA_COMPLETE:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            search: rewriteObjectProps(state.lists[action.model].params.search, {
                                isLoading: false,
                                results: action.ids.slice()
                            })
                        })
                    })
                })
            });

        case actionTypes.CHANGE_SEARCH_VALUE:
            return rewriteObjectProps(state, {
                lists: rewriteObjectProps(state.lists, {
                    [action.model]: rewriteObjectProps(state.lists[action.model], {
                        params: rewriteObjectProps(state.lists[action.model].params, {
                            search: rewriteObjectProps(state.lists[action.model].params.search, {
                                value: action.value
                            })
                        })
                    })
                })
            });

        case actionTypes.CHANGE_SORT_STATE:
            {
                let isDate = state.lists[action.model].params.fields.find(({name}) => name === action.target).isDate;
                return rewriteObjectProps(state, {
                    lists: rewriteObjectProps(state.lists, {
                        [action.model]: rewriteObjectProps(state.lists[action.model], {
                            params: rewriteObjectProps(state.lists[action.model].params, {
                                sort: rewriteObjectProps(state.lists[action.model].params.sort, {
                                    target: action.target,
                                    isDate,
                                    order: action.order,
                                    reverse: action.reverse
                                })
                            })
                        })
                    })
                });
            }

        case actionTypes.ADD_FILTER:
            if (!state.lists[action.model].params.filters.find(filter => filter[action.filterKey])) {
                let {type, dataKey, isDate, descriptor} = state.lists[action.model].params.fields
                    .filter(field => field.filterOperation)
                    .map(field => field.filterOperation.map(operation => {
                        return Object.assign({dataKey: field.name, isDate: field.isDate}, operation);
                    }))
                    .reduce((prevItem, item) => prevItem.concat(item))
                    .find(({ key }) => key === action.filterKey);
                return rewriteObjectProps(state, {
                    lists: rewriteObjectProps(state.lists, {
                        [action.model]: rewriteObjectProps(state.lists[action.model], {
                            params: rewriteObjectProps(state.lists[action.model].params, {
                                filters: state.lists[action.model].params.filters.concat({
                                    [action.filterKey]: {
                                        operatorType: type,
                                        dataKey,
                                        isDate,
                                        description: descriptor,
                                        targetValue: null,
                                        options: {
                                            isLoading: true,
                                            payload: []
                                        }
                                    }
                                })
                            })
                        })
                    })
                });
            }
            return state;

            case actionTypes.DELETE_FILTER:
            {
                let filters = state.lists[action.model].params.filters;
                let index = filters.findIndex(filter => filter[action.filterKey]);
                return rewriteObjectProps(state, {
                    lists: rewriteObjectProps(state.lists, {
                        [action.model]: rewriteObjectProps(state.lists[action.model], {
                            params: rewriteObjectProps(state.lists[action.model].params, {
                                filters: [].concat(filters.slice(0, index), filters.slice(index + 1, filters.length))
                            })
                        })
                    })
                });
            }

            case actionTypes.SET_FILTER_OPTIONS:
            {
                let filters = state.lists[action.model].params.filters;
                let index = filters.findIndex(filter => filter[action.filterKey]);
                let filter = filters.find(filter => filter[action.filterKey]);
                let newFilter = rewriteObjectProps(filter, {
                    [action.filterKey]: rewriteObjectProps(filter[action.filterKey], {
                        options: rewriteObjectProps(filter[action.filterKey].options, {
                            isLoading: false,
                            payload: action.options.slice()
                        })
                    })
                });
                return rewriteObjectProps(state, {
                    lists: rewriteObjectProps(state.lists, {
                        [action.model]: rewriteObjectProps(state.lists[action.model], {
                            params: rewriteObjectProps(state.lists[action.model].params, {
                                filters: [].concat(filters.slice(0, index), newFilter, filters.slice(index + 1, filters.length))
                            })
                        })
                    })
                });
            }

        case actionTypes.SET_FILTER_TARGET_VALUE:
            {
                let filters = state.lists[action.model].params.filters;
                let index = filters.findIndex(filter => filter[action.filterKey]);
                let filter = filters.find(filter => filter[action.filterKey]);
                let newFilter = rewriteObjectProps(filter, {
                    [action.filterKey]: rewriteObjectProps(filter[action.filterKey], {
                        targetValue: action.value
                    })
                });
                return rewriteObjectProps(state, {
                    lists: rewriteObjectProps(state.lists, {
                        [action.model]: rewriteObjectProps(state.lists[action.model], {
                            params: rewriteObjectProps(state.lists[action.model].params, {
                                filters: [].concat(filters.slice(0, index), newFilter, filters.slice(index + 1, filters.length))
                            })
                        })
                    })
                });
            }

        case actionTypes.SET_CUSTOM_FIELDS:
            {
                let fields = state.lists[action.model].params.fields;
                return rewriteObjectProps(state, {
                    lists: rewriteObjectProps(state.lists, {
                        [action.model]: rewriteObjectProps(state.lists[action.model], {
                            params: rewriteObjectProps(state.lists[action.model].params, {
                                fields: action.customFields.map(({name, visible}) => {
                                    return rewriteObjectProps(fields.find(field => field.name === name), {visible});
                                })
                            })
                        })
                    })
                });
            }

        default:
            return state;

    }
};

export default adminReducer;