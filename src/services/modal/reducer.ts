import { ModalActionTypes, TModalActions, IModalState } from './types';

const initialState: IModalState = {
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
    isErrorModalOpen: false,
    modalTitle: ''
}

export const reducer = (state = initialState, action: TModalActions): IModalState => {
    switch (action.type) {
        case ModalActionTypes.OPEN_ORDER_DETAILS:
            return {
                ...state,
                isOrderModalOpen: true
            };
        case ModalActionTypes.OPEN_INGREDIENT_DETAILS:
            return {
                ...state,
                isIngredientModalOpen: true,
                modalTitle: action.payload
            };
        case ModalActionTypes.OPEN_ERROR_DETAILS:
            return {
                ...state,
                isErrorModalOpen: true,
                modalTitle: action.payload
            };
        case ModalActionTypes.CLOSE_MODAL:
            return {
                ...state,
                isOrderModalOpen: false,
                isIngredientModalOpen: false,
                isErrorModalOpen: false,
                modalTitle: ''
            };
        default:
            return state;
    }
}