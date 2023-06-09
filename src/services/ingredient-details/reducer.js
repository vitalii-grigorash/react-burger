import { OPEN_INGREDIENT_DETAILS, OPEN_ORDER_DETAILS, CLOSE_MODAL } from './types';

const initialState = {
    isModalOpen: false,
    isOrderModalOpen: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ORDER_DETAILS:
            return {
                ...state,
                isModalOpen: true,
                isOrderModalOpen: true,
            };
        case OPEN_INGREDIENT_DETAILS:
            return {
                ...state,
                isModalOpen: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
                isOrderModalOpen: false,
            };
        default:
            return state;
    }
}