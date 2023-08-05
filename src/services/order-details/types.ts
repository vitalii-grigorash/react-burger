import { IOrder } from '../../utils/types';

export enum OrderDetailsActionTypes {
    ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS',
    ORDER_REQUEST_ERROR = 'ORDER_REQUEST_ERROR'
}

export interface IAddOrderDetails {
    readonly type: typeof OrderDetailsActionTypes.ORDER_REQUEST_SUCCESS;
    readonly payload: IOrder;
}

export interface ILoadingError {
    readonly type: typeof OrderDetailsActionTypes.ORDER_REQUEST_ERROR;
}

export type TOrderDetailsActions =
    IAddOrderDetails |
    ILoadingError
;

export interface IOrderDetailsState {
    order: IOrder | null,
}