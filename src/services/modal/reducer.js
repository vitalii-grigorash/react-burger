import { OPEN_INGREDIENT_DETAILS, OPEN_ORDER_DETAILS, CLOSE_MODAL, OPEN_ERROR_DETAILS } from './types';

const initialState = {
    isModalOpen: false,
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
    isErrorModalOpen: false,
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
                isIngredientModalOpen: true,
                modalTitle: action.payload
            };
        case OPEN_ERROR_DETAILS:
            return {
                ...state,
                isModalOpen: true,
                isErrorModalOpen: true,
                modalTitle: action.payload
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
                isOrderModalOpen: false,
                isIngredientModalOpen: false,
                isErrorModalOpen: false,
                modalTitle: ''
            };
        default:
            return state;
    }
}