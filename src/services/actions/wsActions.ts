import { TOrdersData } from "../types/data";
import { 
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_ORDERS,
    WS_CONNECTION_DISCONNECT,
    WS_CONNECTION_CLOSED
} from "../constants/constatnts";


export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionDisconnect {
    readonly type: typeof WS_CONNECTION_DISCONNECT;
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: TOrdersData
}



export const wsConnectionStart = (url: string): IWsConnectionStart => ({
    payload: url,
    type: WS_CONNECTION_START, 
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS
})

export const wsConnectionError = (): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR
})

export const wsConnectionDisconnect = (): IWsConnectionDisconnect => ({
    type: WS_CONNECTION_DISCONNECT
})

export const wsGetOrders = (orders: TOrdersData): IWsGetOrders => ({
    type: WS_GET_ORDERS,
    payload: orders
})

export const wsConnectionClosed= (): IWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED
})


export type TWsConnectionAction = 
    | IWsConnectionStart
    | IWsConnectionSuccess 
    | IWsConnectionError
    | IWsConnectionDisconnect
    | IWsGetOrders
    | IWsConnectionClosed