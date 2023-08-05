import { ModalActionTypes, IShowIngredientDetails, IShowOrderDetails, IShowErrorDetails, IHideAllDetails, IShowOrderFeedDetails } from './types';
import { errorOff } from '../loading/actions';
import { AppThunk } from '../../utils/hooks';

export function showIngredientDetails(title: string): IShowIngredientDetails {
    return {
        type: ModalActionTypes.OPEN_INGREDIENT_DETAILS,
        payload: title
    }
}

export function showOrderDetails(): IShowOrderDetails {
    return {
        type: ModalActionTypes.OPEN_ORDER_DETAILS
    }
}

export function showOrderFeedDetails(): IShowOrderFeedDetails {
    return {
        type: ModalActionTypes.OPEN_ORDER_FEED_DETAILS
    }
}

export function showErrorDetails(title: string): IShowErrorDetails {
    return {
        type: ModalActionTypes.OPEN_ERROR_DETAILS,
        payload: title
    }
}

export function hideAllDetails(): IHideAllDetails {
    return {
        type: ModalActionTypes.CLOSE_MODAL
    }
}

export const closeModal = (isErrorModalOpen: boolean): AppThunk => {
    return (dispatch) => {
        dispatch(hideAllDetails());
        if (isErrorModalOpen) {
            dispatch(errorOff());
        }
    }
}