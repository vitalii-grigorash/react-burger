import { INCREMENT_PRICE, RESET_PRICE } from './types';

const initialState = {
    totalPrice: 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_PRICE:
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload
            };
        case RESET_PRICE:
            return {
                ...state,
                totalPrice: 0
            };
        default:
            return state;
    }
}