import { LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './types';

const initialState = {
    ingredients: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload
            };
        case LOAD_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredients: []
            };
        default:
            return state;
    }
}