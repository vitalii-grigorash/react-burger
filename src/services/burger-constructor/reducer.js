import { SELECT_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENTS, RESET_INGREDIENTS } from './types';

const initialState = {
    bun: null,
    ingredients: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_BUN:
            return {
                ...state,
                bun: action.payload,
            };
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        case SORT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients].filter(ingredient => ingredient.uniqKey !== action.payload)
            };
        case RESET_INGREDIENTS:
            return {
                ...state,
                bun: null,
                ingredients: []
            };
        default:
            return state;
    }
}