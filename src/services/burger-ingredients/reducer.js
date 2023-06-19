import { LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './types';

const initialState = {
    bun: [],
    sauce: [],
    topping: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS_SUCCESS:
            return {
                ...state,
                bun: action.payload.bun,
                sauce: action.payload.sauce,
                topping: action.payload.topping
            };
        case LOAD_INGREDIENTS_ERROR:
            return {
                ...state,
                bun: [],
                sauce: [],
                topping: []
            };
        default:
            return state;
    }
}