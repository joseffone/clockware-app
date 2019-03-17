import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authreducer from '../store/reducers/authReducer';
import adminReducer from '../store/reducers/adminReducer';
import clientReducer from '../store/reducers/clientReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers ({
    auth: authreducer,
    admin: adminReducer,
    client: clientReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;