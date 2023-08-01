import type { } from "redux-thunk/extend-redux";
import { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '../services';
import { IWSOrderFeedResponse } from './types';
import { TBurgerConstructorActions } from '../services/burger-constructor/types';
import { TUserActions } from '../services/user/types';
import { TLoadingActions } from '../services/loading/types';
import { TModalActions } from '../services/modal/types';
import { TTotalPriceActions } from '../services/total-price/types';
import { TOrderDetailsActions } from '../services/order-details/types';
import { TIngredientDetailsActions } from '../services/ingredient-details/types';
import { TBurgerIngredientsActions } from '../services/burger-ingredients/types';
import { ConnectionStatus, IWsConnect, IWsDisconnect, IWsError, IWsStatus, IWsUpdateOrders, TWsOrdersActions } from '../services/ws-orders/types';
import { ConnectionStatusProfile, IWsErrorProfile, IWsStatusProfile, IWsUpdateOrdersProfile, TWsOrdersActionsProfile } from '../services/ws-orders-profile/types';

export type TApplicationActions =
    TBurgerConstructorActions |
    TUserActions |
    TLoadingActions |
    TModalActions |
    TTotalPriceActions |
    TOrderDetailsActions |
    TIngredientDetailsActions |
    TBurgerIngredientsActions |
    TWsOrdersActions |
    TWsOrdersActionsProfile
;

export type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk<TReturnType>) => TReturnType;
export type AppThunk<TReturnType = void> = ThunkAction<TReturnType, RootState, unknown, TApplicationActions>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type TWSActions = {
    onError: (error: string) => IWsError;
    onStatus: (status: ConnectionStatus) => IWsStatus;
    onMessage: (orders: IWSOrderFeedResponse) => IWsUpdateOrders,
};

export type TWSActionsProfile = {
    onErrorProfile: (error: string) => IWsErrorProfile;
    onStatusProfile: (status: ConnectionStatusProfile) => IWsStatusProfile;
    onMessageProfile: (orders: IWSOrderFeedResponse) => IWsUpdateOrdersProfile,
};
