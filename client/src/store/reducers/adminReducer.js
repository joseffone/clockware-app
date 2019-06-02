import * as actionTypes from '../actions/action-types';
import { rewriteObjectProps } from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';

const initState = {
    models: {}
};

for (const key in formTypesConfig) {
    initState.models[key] = {
        items: [],
        activeItem: null,
        createdItem: null,
        updatedItem: null,
        deletedItems: null,
        filter: null,
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
                        createdItem: null,
                        error: rewriteObjectProps(state.models[action.model].error, {
                            createError: action.error
                        })
                    })
                })
            });

/*
        case actionTypes.UPDATE_DATA_REQUEST:
            return rewriteObjectProps(state, {
                [action.model]: rewriteObjectProps(state[action.model], {
                    loading: rewriteObjectProps(state[action.model].loading, {
                        isUpdating: true
                    }),
                    error: rewriteObjectProps(state[action.model].error, {
                        updateError: null
                    })
                })
            });
        
        case actionTypes.UPDATE_DATA_SUCCESS:
            return rewriteObjectProps(state, {
                [action.model]: rewriteObjectProps(state[action.model], {
                    loading: rewriteObjectProps(state[action.model].loading, {
                        isUpdating: false
                    }),
                    updatedItem: {...action.updatedData}
                })
            });

        case actionTypes.UPDATE_DATA_FAILURE:
            return rewriteObjectProps(state, {
                [action.model]: rewriteObjectProps(state[action.model], {
                    loading: rewriteObjectProps(state[action.model].loading, {
                        isUpdating: false
                    }),
                    error: rewriteObjectProps(state[action.model].error, {
                        updateError: action.error
                    })
                })
            }); */

        default:
            return state;

    }
};

export default adminReducer;