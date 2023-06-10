import { OPEN_INGREDIENT_DETAILS, OPEN_ORDER_DETAILS, CLOSE_MODAL } from './types';

const initialState = {
    isModalOpen: false,
    isOrderModalOpen: false,
    modalTitle: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ORDER_DETAILS:
            return {
                ...state,
                isModalOpen: true,
                isOrderModalOpen: true
            };
        case OPEN_INGREDIENT_DETAILS:
            return {
                ...state,
                isModalOpen: true,
                modalTitle: action.payload
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
                isOrderModalOpen: false,
                modalTitle: ''
            };
        default:
            return state;
    }
}