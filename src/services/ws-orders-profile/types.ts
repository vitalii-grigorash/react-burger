import { IWSOrderFeedResponse } from '../../utils/types';

export enum WsOrdersTypesProfile {
    WS_CONNECT_PROFILE = 'WS_CONNECT_PROFILE',
    WS_DISCONNECT_PROFILE = 'WS_DISCONNECT_PROFILE',
    WS_ERROR_PROFILE = 'WS_ERROR_PROFILE',
    WS_STATUS_PROFILE = 'WS_STATUS_PROFILE',
    WS_UPDATE_ORDERS_PROFILE = 'WS_UPDATE_ORDERS_PROFILE',
}

export enum ConnectionStatusProfile {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface IWsConnectProfile {
    readonly type: typeof WsOrdersTypesProfile.WS_CONNECT_PROFILE;
    readonly payload: string;
}

export interface IWsDisconnectProfile {
    readonly type: typeof WsOrdersTypesProfile.WS_DISCONNECT_PROFILE;
}

export interface IWsErrorProfile {
    readonly type: typeof WsOrdersTypesProfile.WS_ERROR_PROFILE;
    readonly payload: string;
}

export interface IWsStatusProfile {
    readonly type: typeof WsOrdersTypesProfile.WS_STATUS_PROFILE;
    readonly payload: ConnectionStatusProfile;
}

export interface IWsUpdateOrdersProfile {
    readonly type: typeof WsOrdersTypesProfile.WS_UPDATE_ORDERS_PROFILE;
    readonly payload: IWSOrderFeedResponse;
}

export type TWsOrdersActionsProfile =
    IWsConnectProfile |
    IWsDisconnectProfile |
    IWsErrorProfile |
    IWsStatusProfile |
    IWsUpdateOrdersProfile
;

export interface IWsOrdersStateProfile {
    status: ConnectionStatusProfile,
    connectionError: string,
    orders: IWSOrderFeedResponse | null
}