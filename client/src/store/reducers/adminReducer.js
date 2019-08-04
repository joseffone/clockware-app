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
        selectAllTrigger: false,
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
            currentPage: null,
            itemsPerPage: null,
            totalItems: null
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
                    currentModel: action.modelName,
                    reloadDataTrigger: true
                })
            });

        case actionTypes.SET_RELOAD_DATA_TRIGGER:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: action.flag
                })
            });

        case actionTypes.SET_SELECT_ALL_TRIGGER:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    selectAllTrigger: action.checked
                })
            });
        
        case actionTypes.TOGGLE_LIST_ITEM_SELECT:
            

        default:
            return state;

    }
};

export default adminReducer;