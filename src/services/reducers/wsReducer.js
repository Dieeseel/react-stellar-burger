import { 
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_ORDERS,
    WS_CONNECTION_CLOSED,
 } from "../actions/wsActions"


const initialState = {
    ordersData: null,
    wsRequest: false,
    wsConnected: false,
    wsError: false
}


export const wsReducer = (state = initialState, action) => {
    switch(action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                wsRequest: true
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                wsError: true,
                wsConnected: false
            }
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                ordersData: action.payload
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            }
        }
        default: {
            return state
        }
    }
}