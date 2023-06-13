import { INCREMENT_PRICE, RESET_PRICE } from './types';

export function incrementPrice(price) {
    return {
        type: INCREMENT_PRICE,
        payload: price
    }
}

export function resetPrice() {
    return {
        type: RESET_PRICE
    }
}
