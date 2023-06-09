import { OPEN_INGREDIENT_DETAILS, OPEN_ORDER_DETAILS, CLOSE_MODAL } from './types';

export function showIngredientDetails() {
    return {
        type: OPEN_INGREDIENT_DETAILS
    }
}

export function showOrderDetails() {
    return {
        type: OPEN_ORDER_DETAILS
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}