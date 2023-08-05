import { combineReducers } from 'redux';
import { reducer as burgerIngredientsReducer } from './burger-ingredients/reducer';
import { reducer as loadingReducer } from './loading/reducer';
import { reducer as modalReducer } from './modal/reducer';
import { reducer as ingredientDetailsReducer } from './ingredient-details/reducer';
import { reducer as orderDetailsReducer } from './order-details/reducer';
import { reducer as burgerConstructorReducer } from './burger-constructor/reducer';
import { reducer as totalPriceReducer } from './total-price/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as wsOrdersReducer } from './ws-orders/reducer';
import { reducer as wsOrdersProfileReducer } from './ws-orders-profile/reducer';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    loading: loadingReducer,
    modal: modalReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    totalPrice: totalPriceReducer,
    user: userReducer,
    wsOrders: wsOrdersReducer,
    wsOrdersProfile: wsOrdersProfileReducer
})

export type RootState = ReturnType<typeof rootReducer>;