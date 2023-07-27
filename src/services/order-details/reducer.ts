import { OrderDetailsActionTypes, TOrderDetailsActions, IOrderDetailsState } from './types';

const initialState: IOrderDetailsState = {
    orderNumber: null,
}

export const reducer = (state = initialState, action: TOrderDetailsActions): IOrderDetailsState => {
    switch (action.type) {
        case OrderDetailsActionTypes.ORDER_REQUEST_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload,
            };
        case OrderDetailsActionTypes.ORDER_REQUEST_ERROR:
            return {
                ...state,
                orderNumber: null,
            };
        default:
            return state;
    }
}