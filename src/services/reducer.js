import { combineReducers } from 'redux';
// import { reducer as burgerConstructorReducer } from './burger-constructor/reducer';
import { reducer as burgerIngredientsReducer } from './burger-ingredients/reducer';
import { reducer as loadingReducer } from './loading/reducer';

export const rootReducer = combineReducers({
    // burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    loading: loadingReducer,
}) 