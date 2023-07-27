import { TotalPriceTypes, ITotalPriceState, TTotalPriceActions } from './types';

const initialState: ITotalPriceState = {
    totalPrice: 0
}

export const reducer = (state = initialState, action: TTotalPriceActions): ITotalPriceState => {
    switch (action.type) {
        case TotalPriceTypes.INCREMENT_PRICE:
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload
            };
        case TotalPriceTypes.RESET_PRICE:
            return {
                ...state,
                totalPrice: 0
            };
        default:
            return state;
    }
}