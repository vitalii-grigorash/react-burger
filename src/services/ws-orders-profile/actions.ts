import { createAction } from "@reduxjs/toolkit";
import { IWSOrderFeedResponse } from '../../utils/types';
import { WsOrdersTypes } from './types';

export const connectProfile = createAction<string, WsOrdersTypes.WS_CONNECT_PROFILE>(WsOrdersTypes.WS_CONNECT_PROFILE);
export const disconnectProfile = createAction(WsOrdersTypes.WS_DISCONNECT_PROFILE);
export const wsConnectingProfile = createAction(WsOrdersTypes.WS_CONNECTING_PROFILE);
export const wsOpenProfile = createAction(WsOrdersTypes.WS_OPEN_PROFILE);
export const wsCloseProfile = createAction(WsOrdersTypes.WS_CLOSE_PROFILE);
export const wsMessageProfile = createAction<IWSOrderFeedResponse, WsOrdersTypes.WS_MESSAGE_PROFILE>(WsOrdersTypes.WS_MESSAGE_PROFILE);
export const wsErrorProfile = createAction<string, WsOrdersTypes.WS_ERROR_PROFILE>(WsOrdersTypes.WS_ERROR_PROFILE);

export type TWSActionsProfile =
    ReturnType<typeof connectProfile> |
    ReturnType<typeof disconnectProfile> |
    ReturnType<typeof wsConnectingProfile> |
    ReturnType<typeof wsOpenProfile> |
    ReturnType<typeof wsCloseProfile> |
    ReturnType<typeof wsMessageProfile> |
    ReturnType<typeof wsErrorProfile>
;
