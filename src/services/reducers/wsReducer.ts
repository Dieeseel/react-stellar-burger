import { TWsConnectionAction } from "../actions/wsActions"
import { TOrdersData } from "../types/data"
import { 
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_ORDERS,
    WS_CONNECTION_CLOSED,
} from "../constants/constatnts"


type TWsState = {
    ordersData: TOrdersData | null,
    wsRequest: boolean,
    wsConnected: boolean,
    wsError: boolean
}

const initialState: TWsState = {
    ordersData: null,
    wsRequest: false,
    wsConnected: false,
    wsError: false
}


export const wsReducer = (state = initialState, action: TWsConnectionAction): TWsState => {
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