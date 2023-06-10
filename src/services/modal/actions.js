import { OPEN_INGREDIENT_DETAILS, OPEN_ORDER_DETAILS, CLOSE_MODAL } from './types';
import { deleteIngredientDetails } from '../ingredient-details/actions';

export function showIngredientDetails(title) {
    return {
        type: OPEN_INGREDIENT_DETAILS,
        payload: title
    }
}

export function showOrderDetails() {
    return {
        type: OPEN_ORDER_DETAILS
    }
}

export function closeModal(isOrderModalOpen) {
    return dispatch => {
        dispatch({ type: CLOSE_MODAL });
        if (!isOrderModalOpen) {
            dispatch(deleteIngredientDetails());
        }
    }
}