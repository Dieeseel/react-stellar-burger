import {
    OPEN_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS,
} from '../actions/burger'


const initialState = {
    ingredientDetails: null,
}


export const ingredientDetailsModalReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: action.details
            }
        }
        case CLOSE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: null
            }
        }
        default: {
            return state
        }
    }
}