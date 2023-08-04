import { OrderDetailsActionTypes, TOrderDetailsActions, IOrderDetailsState } from './types';

const initialState: IOrderDetailsState = {
    order: null,
}

export const reducer = (state = initialState, action: TOrderDetailsActions): IOrderDetailsState => {
    switch (action.type) {
        case OrderDetailsActionTypes.ORDER_REQUEST_SUCCESS:
            return {
                ...state,
                order: action.payload,
            };
        case OrderDetailsActionTypes.ORDER_REQUEST_ERROR:
            return {
                ...state,
                order: null,
            };
        default:
            return state;
    }
}