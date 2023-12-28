import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TIngredientsActions } from "../actions/ingredients";
import { TUserActions } from '../actions/user';
import { TConstructorActions } from '../actions/constructor';
import { TWsConnectionAction } from '../actions/wsActions';
import { TOrderActions } from '../actions/order';
import { store } from "../store";


type TApplicationActions = 
    | TIngredientsActions
    | TUserActions
    | TConstructorActions
    | TWsConnectionAction
    | TOrderActions


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;