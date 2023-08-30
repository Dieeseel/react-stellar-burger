import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer';
import { ingredientDetailsModalReducer } from './ingredientDetailsModalReducer'
import { ingredientsReducer } from './ingredientsReducer'
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientsDetailModal: ingredientDetailsModalReducer,
    order: orderReducer,
})

