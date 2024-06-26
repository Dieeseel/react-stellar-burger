import { TIngredient } from '../types/data'
import { TConstructorActions } from '../actions/constructor'
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLOSE_ORDER_MODAL
} from '../constants/constatnts'



type TConstructorState = {
    burgerConstructor: ReadonlyArray<TIngredient>;
    totalPrice: number
}

const initialState: TConstructorState = {
    burgerConstructor: [],
    totalPrice: 0
}


export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch(action.type) {
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
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                burgerConstructor: [],
                totalPrice: 0
            }
        }
        default: {
            return state
        }
    }
}
