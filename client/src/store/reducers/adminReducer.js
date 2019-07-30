import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';

const initState = {
    models: {},
    lists: {},
    ui: {
        currentModel: 'users',
        reloadDataTrigger: false,
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
        items: [],
        activeId: null,
        selectedIds: [],
        params: {
            fields: Object.keys(formTypesConfig[key]).map(field => {
                return {
                    name: field,
                    alias: formTypesConfig[key][field].config.label,
                    sortable: field !== 'id' ? true : false 
                };
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
                    reloadDataTrigger: true 
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
                        items: [...action.fetchedData]
                    })
                }),
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: false 
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
                    reloadDataTrigger: false 
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

        case actionTypes.TRIGGER_DATA_RELOAD:
            return rewriteObjectProps(state, {
                ui: rewriteObjectProps(state.ui, {
                    reloadDataTrigger: true
                })
            });

        default:
            return state;

    }
};

export default adminReducer;