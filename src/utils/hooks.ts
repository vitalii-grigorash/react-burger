import type { } from "redux-thunk/extend-redux";
import { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import { RootState } from '../services';

import { TBurgerConstructorActions } from '../services/burger-constructor/types';
import { TUserActions } from '../services/user/types';
import { TLoadingActions } from '../services/loading/types';
import { TModalActions } from '../services/modal/types';
import { TTotalPriceActions } from '../services/total-price/types';
import { TOrderDetailsActions } from '../services/order-details/types';
import { TIngredientDetailsActions } from '../services/ingredient-details/types';
import { TBurgerIngredientsActions } from '../services/burger-ingredients/types';

type TApplicationActions =
    TBurgerConstructorActions |
    TUserActions |
    TLoadingActions |
    TModalActions |
    TTotalPriceActions |
    TOrderDetailsActions |
    TIngredientDetailsActions |
    TBurgerIngredientsActions
;

type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk<TReturnType>) => TReturnType;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
