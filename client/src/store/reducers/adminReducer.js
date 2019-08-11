import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';
import tableFieldsConfig from '../../util/presets/tableFieldsConfig';

const initState = {
    models: {},
    lists: {},
    ui: {
        currentModel: 'users',
        reloadDataTrigger: false,
        reloadDataCounter: 0,
        errorDataCounter: [],
        selectAlltrigger: false,
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
        ids: [],
        activeId: null,
        selectedIds: [],
        params: {
            fields: key === 'authentication' ? [] : Object.keys(tableFieldsConfig[key]).map(field => {
                return {...tableFieldsConfig[key][field]};
            }),
            filter: {},
            sort: {
                target: null,
                order: null
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
                    reloadDataTrigger: true
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

        default:
            return state;

    }
};

export default adminReducer;