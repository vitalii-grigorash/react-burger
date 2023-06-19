import { ORDER_REQUEST_SUCCESS, ORDER_REQUEST_ERROR } from './types';

const initialState = {
    orderNumber: null,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload,
            };
        case ORDER_REQUEST_ERROR:
            return {
                ...state,
                orderNumber: null,
            };
        default:
            return state;
    }
}