import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';

const initState = {
    models: {},
    lists: {},
    ui: {}
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
            fields: [],
            filter: {},
            sort: {
                target: null,
                order: null
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

        default:
            return state;

    }
};

export default adminReducer;