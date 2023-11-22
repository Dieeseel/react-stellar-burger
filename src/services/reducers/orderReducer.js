import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
} from '../actions/burger'


const initialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
}


export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.order,
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                orderNumber: null,
                orderRequest: false
            }
        }
        default: {
            return state
        }
    }
}