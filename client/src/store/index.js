import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../store/reducers/authReducer';
import adminReducer from '../store/reducers/adminReducer';
import clientReducer from '../store/reducers/clientReducer';
import globalReducer from '../store/reducers/globalReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers ({
    auth: authReducer,
    admin: adminReducer,
    client: clientReducer,
    global: globalReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;