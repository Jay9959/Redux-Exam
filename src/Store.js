import { applyMiddleware, createStore, compose } from 'redux';
import { thunk } from "redux-thunk";
import { rootReducer } from './GoogleServices/Reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)