import { OPEN_INGREDIENT_DETAILS, OPEN_ORDER_DETAILS, CLOSE_MODAL, OPEN_ERROR_DETAILS } from './types';
import { errorOff } from '../loading/actions';

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

export function showErrorDetails(title) {
    return {
        type: OPEN_ERROR_DETAILS,
        payload: title
    }
}

export function closeModal(isErrorModalOpen) {
    return dispatch => {
        dispatch({ type: CLOSE_MODAL });
        if (isErrorModalOpen) {
            dispatch(errorOff());
        }
    }
}