import { TIngredientsActions } from '../actions/ingredients'
import { TIngredient } from '../types/data'
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../constants/constatnts'


type TIngredientsState = {
    ingredients: ReadonlyArray<TIngredient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean
}

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}


export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
        default: {
            return state
        }
    }
}
