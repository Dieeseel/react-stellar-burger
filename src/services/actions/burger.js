import { getIngredientsRequest, makeNewOrder } from "../api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'

export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS'
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS'

export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'


export const getIngredients = () => {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientsRequest().then(res => {
            if (res.success && res) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                })
            }
            else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        })
    }
}

export const sendOrder = (orderData) => {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        makeNewOrder(orderData).then(res => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: res.order.number
            })
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_ORDER_FAILED
            });
        })
    }
}
