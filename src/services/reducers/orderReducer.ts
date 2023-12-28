import { TOrderActions } from '../actions/order'
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
} from '../constants/constatnts'


type TOrderState = {
    orderNumber: number | null,
    orderRequest: boolean,
    orderFailed: boolean
}

const initialState: TOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
}


export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
                orderNumber: action.orderNumber,
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