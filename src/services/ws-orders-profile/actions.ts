import {
    WsOrdersTypesProfile,
    ConnectionStatusProfile,
    IWsConnectProfile,
    IWsDisconnectProfile,
    IWsErrorProfile,
    IWsStatusProfile,
    IWsUpdateOrdersProfile
} from './types';

import { IWSOrderFeedResponse } from '../../utils/types';

export const WsConnectProfile = (wsUrl: string): IWsConnectProfile=> ({
    type: WsOrdersTypesProfile.WS_CONNECT_PROFILE,
    payload: wsUrl
});

export const WsDisconnectProfile = (): IWsDisconnectProfile => ({
    type: WsOrdersTypesProfile.WS_DISCONNECT_PROFILE
});

export const WsErrorProfile = (error: string): IWsErrorProfile => ({
    type: WsOrdersTypesProfile.WS_ERROR_PROFILE,
    payload: error
});

export const WsStatusProfile = (status: ConnectionStatusProfile): IWsStatusProfile => ({
    type: WsOrdersTypesProfile.WS_STATUS_PROFILE,
    payload: status
});

export const WsUpdateOrdersProfile = (orders: IWSOrderFeedResponse): IWsUpdateOrdersProfile => ({
    type: WsOrdersTypesProfile.WS_UPDATE_ORDERS_PROFILE,
    payload: orders
});
