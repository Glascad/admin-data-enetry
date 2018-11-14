import { combineReducers, createStore, applyMiddleware, compose } from redux;
import reducer, { initialState } from './reducer';
import client from './client';

export default createStore(
    combineReducers({
        reducer,
        apollo: client.reducer()
    }),
    initialState,
    compose(applyMiddleware(client.middleware()))
);