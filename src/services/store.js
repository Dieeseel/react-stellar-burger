import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middleware/socketMiddleware';
import { 
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_ORDERS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_DISCONNECT
 } from './actions/wsActions';


const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_DISCONNECT,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);
