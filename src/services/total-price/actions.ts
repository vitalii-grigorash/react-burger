import { TotalPriceTypes, IIncrementPrice, IResetPrice } from './types';

export function incrementPrice(price: number): IIncrementPrice {
    return {
        type: TotalPriceTypes.INCREMENT_PRICE,
        payload: price
    }
}

export function resetPrice(): IResetPrice {
    return {
        type: TotalPriceTypes.RESET_PRICE
    }
}
