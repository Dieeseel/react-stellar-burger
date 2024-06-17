import { ICloseModalAction } from './order';
import { TIngredient } from '../types/data';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
} from '../constants/constatnts'


export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly price: number;
    readonly ingredient: TIngredient 
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly price: number;
    readonly uuid: string
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly moveIndex: number
}



export const addingredientAction = (price: number, ingredient: TIngredient, uuid: string):IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    price,
    ingredient: {...ingredient, uuid}
})

export const removeIngredientAction = (price: number, uuid: string):IRemoveIngredientAction  => ({
    type: REMOVE_INGREDIENT,
    price,
    uuid
})

export const moveIngredientAction = (dragIndex: number, moveIndex: number):IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    dragIndex,
    moveIndex
})


export type TConstructorActions =
  | IAddIngredientAction 
  | IRemoveIngredientAction
  | IMoveIngredientAction
  | ICloseModalAction