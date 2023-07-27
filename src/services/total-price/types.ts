export enum TotalPriceTypes {
    INCREMENT_PRICE = 'INCREMENT_PRICE',
    RESET_PRICE = 'RESET_PRICE'
}

export interface IIncrementPrice {
    readonly type: typeof TotalPriceTypes.INCREMENT_PRICE;
    readonly payload: number;
}

export interface IResetPrice {
    readonly type: typeof TotalPriceTypes.RESET_PRICE;
}

export type TTotalPriceActions =
    IIncrementPrice |
    IResetPrice
;

export interface ITotalPriceState {
    totalPrice: number
}