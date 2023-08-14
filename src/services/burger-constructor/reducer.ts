import { BurgerConstructorActionTypes, IBurgerConstructorState, TBurgerConstructorActions } from './types';

export const initialState: IBurgerConstructorState = {
    bun: null,
    ingredients: []
}

export const reducer = (state = initialState, action: TBurgerConstructorActions): IBurgerConstructorState => {
    switch (action.type) {
        case BurgerConstructorActionTypes.SELECT_BUN:
            return {
                ...state,
                bun: action.payload,
            };
        case BurgerConstructorActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        case BurgerConstructorActionTypes.SORT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            };
        case BurgerConstructorActionTypes.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients].filter(ingredient => ingredient.uniqKey !== action.payload)
            };
        case BurgerConstructorActionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                bun: null,
                ingredients: []
            };
        default:
            return state;
    }
}