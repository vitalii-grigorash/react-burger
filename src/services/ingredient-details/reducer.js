import { ADD_MODAL_INGREDIENT_DETAILS, DELETE_MODAL_INGREDIENT_DETAILS } from './types';

const initialState = {
    ingredient: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MODAL_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredient: action.payload
            };
        case DELETE_MODAL_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredient: null
            };
        default:
            return state;
    }
}