import { combineReducers } from 'redux';
import { reducer as burgerIngredientsReducer } from './burger-ingredients/reducer';
import { reducer as loadingReducer } from './loading/reducer';
import { reducer as modalReducer } from './modal/reducer';
import { reducer as ingredientDetailsReducer } from './ingredient-details/reducer';
import { reducer as orderDetailsReducer } from './order-details/reducer';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    loading: loadingReducer,
    modal: modalReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
}) 