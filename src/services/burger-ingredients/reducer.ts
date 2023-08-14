import { BurgerIngredientsTypes, TBurgerIngredientsActions, IBurgerIngredientsState } from './types';

export const initialState: IBurgerIngredientsState = {
    ingredients: []
}

export const reducer = (state = initialState, action: TBurgerIngredientsActions): IBurgerIngredientsState => {
    switch (action.type) {
        case BurgerIngredientsTypes.LOAD_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload
            };
        case BurgerIngredientsTypes.LOAD_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredients: []
            };
        default:
            return state;
    }
}