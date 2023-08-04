export enum ModalActionTypes {
    OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS',
    OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS',
    OPEN_ORDER_FEED_DETAILS = 'OPEN_ORDER_FEED_DETAILS',
    OPEN_ERROR_DETAILS = 'OPEN_ERROR_DETAILS',
    CLOSE_MODAL = 'CLOSE_MODAL'
}

export interface IShowIngredientDetails {
    readonly type: typeof ModalActionTypes.OPEN_INGREDIENT_DETAILS;
    readonly payload: string;
}

export interface IShowOrderDetails {
    readonly type: typeof ModalActionTypes.OPEN_ORDER_DETAILS;
}

export interface IShowOrderFeedDetails {
    readonly type: typeof ModalActionTypes.OPEN_ORDER_FEED_DETAILS;
}

export interface IShowErrorDetails {
    readonly type: typeof ModalActionTypes.OPEN_ERROR_DETAILS;
    readonly payload: string;
}

export interface IHideAllDetails {
    readonly type: typeof ModalActionTypes.CLOSE_MODAL;
}

export type TModalActions =
    IShowIngredientDetails |
    IShowOrderDetails |
    IShowErrorDetails |
    IShowOrderFeedDetails |
    IHideAllDetails
;

export interface IModalState {
    isOrderModalOpen: boolean,
    isIngredientModalOpen: boolean,
    isErrorModalOpen: boolean,
    isOrderFeedModalOpen: boolean,
    modalTitle: string
}