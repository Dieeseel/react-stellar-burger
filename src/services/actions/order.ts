import { AppDispatch, AppThunk } from "../types";
import { makeNewOrder } from "../api";
import { 
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
} from "../constants/constatnts";


export interface IGetOrderAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccesAction {
    readonly type: typeof GET_ORDER_SUCCESS
    readonly orderNumber: number
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_ORDER_MODAL
}



export const getOrderAction = (): IGetOrderAction => ({
    type: GET_ORDER_REQUEST
})

export const getOrderSuccesAction = (orderNumber: number): IGetOrderSuccesAction=> ({
    type: GET_ORDER_SUCCESS,
    orderNumber
})

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED
})

export const closeModalAction = (): ICloseModalAction => ({
    type: CLOSE_ORDER_MODAL
})


export const sendOrder = (orderData: string[], token: string | undefined) => {
    return function(dispatch: AppDispatch) {
        dispatch(getOrderAction());
        makeNewOrder(orderData, token).then(res => {
            dispatch(getOrderSuccesAction(res.order.number))
        })
        .catch((err) => {
            console.log(err);
            dispatch(getOrderFailedAction());
        })
    }
}


export type TOrderActions = 
    | IGetOrderAction
    | IGetOrderFailedAction
    | IGetOrderSuccesAction
    | ICloseModalAction