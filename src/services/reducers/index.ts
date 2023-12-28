import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer';
import { ingredientsReducer } from './ingredientsReducer'
import { orderReducer } from './orderReducer';
import { authReducer } from './userReducer';
import { wsReducer } from './wsReducer';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    auth: authReducer,
    orders: wsReducer,
})

