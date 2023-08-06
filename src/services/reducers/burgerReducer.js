import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL,
    OPEN_INGREDIENT_RETAILS,
    CLOSE_INGREDIENT_RETAILS,
    MOVE_INGREDIENT
} from '../actions/burger'

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerConstructor: [],

    orderNumber: null,
    orderRequest: false,
    orderFailed: false,

    ingredientDetails: null,

    totalPrice: 0
}


export const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }

        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true
            }
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                totalPrice: state.totalPrice + action.price,
                burgerConstructor: [
                    ...state.burgerConstructor,
                    action.ingredient
                ]
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                totalPrice: state.totalPrice - action.price,
                burgerConstructor: [...state.burgerConstructor].filter(item => item.uuid !== action.uuid)
            }
        }
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
                orderRequest: false
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
            }
        }
        case OPEN_INGREDIENT_RETAILS: {
            return {
                ...state,
                ingredientDetails: action.details
            }
        }
        case CLOSE_INGREDIENT_RETAILS: {
            return {
                ...state,
                ingredientDetails: null
            }
        }
        case MOVE_INGREDIENT: {
            const buns = state.burgerConstructor.filter(item => item.type === 'bun')
            const mainIngredients = state.burgerConstructor.filter(item => item.type !== 'bun')

            const newMainIngredientsArray = [...mainIngredients]
            newMainIngredientsArray.splice(action.moveIndex, 0, newMainIngredientsArray.splice(action.dragIndex, 1)[0]);

            return {
                ...state,
                burgerConstructor: [...buns, ...newMainIngredientsArray]
            }
        }
        default: {
            return state
        }
    }
}
