import { getIngredientsRequest, makeNewOrder } from "../api";
import { TIngredient } from "../types/data";
import { AppDispatch } from "../types";
import { 
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../constants/constatnts";


export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccesAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>
}



export const getIngredientsAction = (): IGetIngredientsAction => ({
    type: GET_INGREDIENTS_REQUEST
})

export const getIngredientsSuccesAction = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccesAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
})

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
})




export const getIngredients = () => {
    return function(dispatch: AppDispatch) {
        dispatch(getIngredientsAction());
        getIngredientsRequest().then(res => {
            if (res.success && res) {
                dispatch(getIngredientsSuccesAction(res.data))
            }
            else {
                dispatch(getIngredientsFailedAction())
            }
        })
    }
}



export type TIngredientsActions =
  | IGetIngredientsAction 
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccesAction

