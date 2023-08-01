import { IWSOrderFeedResponse } from '../../utils/types';

export enum WsOrdersTypes {
    WS_CONNECT = 'WS_CONNECT',
    WS_DISCONNECT = 'WS_DISCONNECT',
    WS_ERROR = 'WS_ERROR',
    WS_STATUS = 'WS_STATUS',
    WS_UPDATE_ORDERS = 'WS_UPDATE_ORDERS',
}

export enum ConnectionStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface IWsConnect {
    readonly type: typeof WsOrdersTypes.WS_CONNECT;
    readonly payload: string;
}

export interface IWsDisconnect {
    readonly type: typeof WsOrdersTypes.WS_DISCONNECT;
}

export interface IWsError {
    readonly type: typeof WsOrdersTypes.WS_ERROR;
    readonly payload: string;
}

export interface IWsStatus {
    readonly type: typeof WsOrdersTypes.WS_STATUS;
    readonly payload: ConnectionStatus;
}

export interface IWsUpdateOrders {
    readonly type: typeof WsOrdersTypes.WS_UPDATE_ORDERS;
    readonly payload: IWSOrderFeedResponse;
}

export type TWsOrdersActions =
    IWsConnect |
    IWsDisconnect |
    IWsError |
    IWsStatus |
    IWsUpdateOrders
;

export interface IWsOrdersState {
    status: ConnectionStatus,
    connectionError: string,
    orders: IWSOrderFeedResponse | null
}