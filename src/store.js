import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';

const logger = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(thunk, promise, logger)
);

export default store;
