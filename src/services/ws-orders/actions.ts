import {
    WsOrdersTypes,
    ConnectionStatus,
    IWsConnect,
    IWsDisconnect,
    IWsError,
    IWsStatus,
    IWsUpdateOrders
} from './types';

import { IWSOrderFeedResponse } from '../../utils/types';

export const WsConnect = (wsUrl: string): IWsConnect => ({
    type: WsOrdersTypes.WS_CONNECT,
    payload: wsUrl
});

export const WsDisconnect = (): IWsDisconnect => ({
    type: WsOrdersTypes.WS_DISCONNECT
});

export const WsError = (error: string): IWsError => ({
    type: WsOrdersTypes.WS_ERROR,
    payload: error
});

export const WsStatus = (status: ConnectionStatus): IWsStatus => ({
    type: WsOrdersTypes.WS_STATUS,
    payload: status
});

export const WsUpdateOrders = (orders: IWSOrderFeedResponse): IWsUpdateOrders => ({
    type: WsOrdersTypes.WS_UPDATE_ORDERS,
    payload: orders
});
